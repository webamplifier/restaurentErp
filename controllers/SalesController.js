const express = require("express");
const router = express.Router();
const HELPERS = require('../Helpers/helpers')

// this below function is used to get the list of sales
router.list = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let sale_list = [];


    await knex("sale_start").where('restaurent_id', req.user_data.restaurent_id).where("status",1).orderBy("id", "desc").then(response => {
        sale_list = response;
        status = 200;
        message = "Sale record has been fetched!"
    }).catch(err => console.log(err))

    return res.json({ status, message, sale_list })
}

// this below function is used to get the list of pending sales
router.listPending = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let sale_list = [];
    
    let default_query = "select * from sale_start";
    let sort = "";
    let total_records = "";
    
    let count_query = "select COUNT(*) as total from sale_start";
    
    if (req.query.sort_order) {
        
        sort = JSON.parse(req.query.sort_order);
    }

    let filter_query = ` where sale_start.restaurent_id='${req.user_data.restaurent_id}' and status=2`;

    if(req.query.filter_value){
        filter_query += ` and (sale_start.invoice_number LIKE '%${req.query.filter_value}%' or sale_start.customer_name LIKE '%${req.query.filter_value}%' or sale_start.total_after_roundoff LIKE '%${req.query.filter_value}%' or sale_start.payment_type LIKE '%${req.query.filter_value}%')`
    }
    if(req.query.to && req.query.from){
        let date_from = HELPERS.formatDate(req.query.from);
        let date_to = HELPERS.formatDate(req.query.to);
        filter_query += ` and ((sale_start.sale_date BETWEEN '${req.query.from}' AND '${req.query.to}') or (sale_start.sale_date BETWEEN '${date_from}' AND '${date_to}'))`;
    }
    
    let order_by_query = " order by sale_start.id desc";

    if (req.query.page_number && req.query.page_size) {
        let offset = (req.query.page_number - 1) * (req.query.page_size);
        order_by_query = ` order by sale_start.id desc LIMIT ${req.query.page_size} offset ${offset}`;
        if (sort) {
            order_by_query = ` order by sale_start.${sort.column} ${sort.order} LIMIT ${req.query.page_size} offset ${offset}`;
        }
    }
    
    await knex.raw(default_query + filter_query + order_by_query).then(async response => {
        if (response[0]) {
            sale_list = response[0];
            await knex.raw(count_query + filter_query).then(response1 => {
                if (response1[0]) {
                    total_records = response1[0][0].total;
                }
            }).catch((err) => console.log(err));
            status = 200;
            message = "Sale List has been fetched successfully";
        }
    }).catch((err) => console.log(err));

    return res.json({ status, message, sale_list, total_records })
}

// this below function is used to create sale entry
router.create = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let inputs = req.body;
    let sale_start_id = 0;


    let header = JSON.parse(inputs.final_array)[0];
    let final = JSON.parse(inputs.final_array)[1];


    let items = JSON.parse(inputs.allItems)

    let invoice_number = 0

    let query = `SELECT * FROM sale_start where sale_start.restaurent_id = ${req.user_data.restaurent_id} order by sale_start.id DESC LIMIT 0,1`;

    await knex.raw(query).then(async response => {
        if (response[0].length > 0) {
            invoice_number = parseInt(response[0][0].invoice_number)
        }

        let create = {
            uuid: await HELPERS.getKnexUuid(knex),
            restaurent_id: req.user_data.restaurent_id,
            invoice_number: invoice_number + 1,
            sale_date: header.saleDate ? header.saleDate : await HELPERS.current_date(),
            customer_name: header.customer,
            customer_mobile: header.mobile_number,
            total_supply: final.totalValue,
            item_discount_percentage: '',
            item_discount_amount: 0,//There is no option of disount for items in project
            bill_discount_percentage: final.finalDiscountCriteria == "percent" ? final.finalDiscountValue : '',
            bill_discount_amount: final.finalDiscountCriteria == "amount" ? final.finalDiscountValue : '',
            total_before_roundoff: final.finalAmount,
            total_after_roundoff: final.finalAmount,
            roundoff: 0, //round off 0 becuase we are not performing round off here
            discount_type: header.discountType,
            taxable_amount: final.tax_amount,
            remarks: final.remarks,
            amount_paid: 0,//there is no option to enter paid amount in project
            payment_type: final.paymentMethod,
            remain_amount: 0,//there is no option to enter remain amount in project
            remain_amount_date: null,//there is no option to enter remain payment date in project
            created_by: req.user_data.id,
            created_by_name: req.user_data.name,
            created_at: await HELPERS.dateTime(),
            status: header.pending == true ? 2 : 1,
        };

        await knex("sale_start").where('restaurent_id', req.user_data.restaurent_id).insert(create, "id").then(response => {
            sale_start_id = response[0];
        }).catch(err => console.log(err))

        if (sale_start_id) {
            for (let i = 0; i < items.length; i++) {
                let data = items[i];
                let item_id = 0;

                await knex("products").where("id", data.item.value).where('restaurent_id', req.user_data.restaurent_id).then(async responseProduct => {
                    if (responseProduct.length > 0) {
                        let item_obj = {
                            uuid: await HELPERS.getKnexUuid(knex),
                            restaurent_id: req.user_data.restaurent_id,
                            sale_start_id: sale_start_id,
                            product_id: data.item.value,
                            product_name: data.item.label,
                            description: data.description,
                            qty: data.qty,
                            mrp: data.mrp,
                            free_qty: 0, //their is no any option for free in this project
                            amount_before_tax: data.amount_item,
                            tax_percent: data.tax,
                            amount_after_tax: data.total,
                            tax_amount: data.tax_amount,
                            amount_before_discount: 0, //their is no discount option for items in project
                            discount_percent: 0, //their is no discount option for items in project
                            amount_after_discount: 0, //their is no discount option for items in project
                            discount_amount: 0, //their is no discount option for items in project
                            total: data.total
                        }

                        await knex("sale_items").where('restaurent_id', req.user_data.restaurent_id).insert(item_obj, "id").then(response => {
                            if (response[0]) {
                                item_id = response[0];
                                status = 200;
                                message = "Sale has been created successfully!"
                            }
                        }).catch(err => console.log(err))

                        if (responseProduct[0].stock_quantity) {
                            await knex('products').where('id', data.item.value).update({
                                stock_quantity: (parseInt(responseProduct[0].stock_quantity) - parseInt(data.qty)).toString()
                            }).then(response => {
                                status = 200;
                                message = "Sale Entry has been created successfully"
                            }).catch(err => console.log(err))
                        }
                    }
                })

            }
        }
    })

    return res.json({ status, message })

}


// this below route is used to fetch the details
router.fetchById = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let id = req.params.id;
    let sale_header = {};
    let sale_items = [];



    await knex("sale_start").where("id", id).where('restaurent_id', req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            sale_header = response[0];
            status = 200;
            message = "Sale record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    await knex("sale_items").where("sale_start_id", id).where('restaurent_id', req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            sale_items = response;
            status = 200;
            message = "Sale record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, sale_header, sale_items })
}

// this below function is used to update the purchase

router.update = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let inputs = req.body;
    let id = req.params.id;
    let sale_start_id = req.params.id;

    let header = JSON.parse(inputs.final_array)[0];
    let final = JSON.parse(inputs.final_array)[1];

    let past_items_id = [];
    let new_items_id = [];

    let items = JSON.parse(inputs.allItems)

    let update = {
        invoice_number: header.invoiceNo,
        sale_date: header.saleDate,
        customer_name: header.customer,
        customer_mobile: header.mobile_number,
        total_supply: final.totalValue,
        item_discount_percentage: '',
        item_discount_amount: 0,//their is no field of discount in items in project
        bill_discount_percentage: final.finalDiscountCriteria == "percent" ? final.finalDiscountValue : '',
        bill_discount_amount: final.finalDiscountCriteria == "amount" ? final.finalDiscountValue : '',
        total_before_roundoff: final.finalAmount,
        total_after_roundoff: final.finalAmount,
        roundoff: 0, //round off 0 becuase we are not performing round off here
        discount_type: header.discountType,
        taxable_amount: final.tax_amount,
        remarks: final.remarks,
        amount_paid: final.finalAmount,
        payment_type: final.paymentMethod,
        remain_amount: 0,
        remain_amount_date: null,
        status: header.pending == true ? 2 : 1,
    };

    await knex("sale_items").where("sale_start_id", sale_start_id).where('restaurent_id', req.user_data.restaurent_id).del().then(response => {
        // 
    }).catch(err => console.log(err))

    await knex("sale_start").where("id", id).where('restaurent_id', req.user_data.restaurent_id).update(update).then(response => {
        status = 200;
        message = "Sale has been updated successfully!"
    }).catch(err => console.log(err))

    if (sale_start_id) {
        for (let i = 0; i < items.length; i++) {
            let data = items[i];
            let item_id = 0;

            await knex("products").where("id", data.item.value).where('restaurent_id', req.user_data.restaurent_id).then(async responseProduct => {
                if (responseProduct.length > 0) {
                    let item_obj = {
                        uuid: await HELPERS.getKnexUuid(knex),
                        restaurent_id: req.user_data.restaurent_id,
                        sale_start_id: sale_start_id,
                        product_id: data.item.value,
                        product_name: data.item.label,
                        description: data.description,
                        qty: data.qty,
                        mrp: data.mrp,
                        free_qty: 0, //their is no any option for free in this project
                        amount_before_tax: data.amount_item,
                        tax_percent: data.tax,
                        amount_after_tax: data.total,
                        tax_amount: data.tax_amount,
                        amount_before_discount: 0, //their is no discount option for items in project
                        discount_percent: 0, //their is no discount option for items in project
                        amount_after_discount: 0, //their is no discount option for items in project
                        discount_amount: 0, //their is no discount option for items in project
                        total: data.total
                    }

                    await knex("sale_items").where('restaurent_id', req.user_data.restaurent_id).insert(item_obj, "id").then(response => {
                        if (response[0]) {
                            item_id = response[0];
                            status = 200;
                            message = "Sale has been updated successfully!"
                        }
                    }).catch(err => console.log(err))

                    if (responseProduct[0].stock_quantity) {
                        await knex('products').where('id', data.item.value).update({
                            stock_quantity: (parseInt(responseProduct[0].stock_quantity) - parseInt(data.qty)).toString()
                        }).then(response => {
                            status = 200;
                            message = "Sale Entry has been updated successfully"
                        }).catch(err => console.log(err))
                    }
                }
            })
        }
    }

    return res.json({ status, message })


}


// this below function is used to delete the purchase
router.delete = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let id = req.params.id;

    if (req.user_data.role == 2 || req.user_data.role == 1) {

        await knex("sale_start").where("id", id).where('restaurent_id', req.user_data.restaurent_id).del().then(response => {
            if (response) {
                status = 200;
                message = "Sale start has been deleted!"
            }
        }).catch(err => console.log(err))

        await knex("sale_items").where("sale_start_id", id).where('restaurent_id', req.user_data.restaurent_id).del().then(response => {
            if (response) {
                status = 200;
                message = "Sale items has been deleted!"
            }
        }).catch(err => console.log(err))
    }
    else {
        status = 300;
        message = "You are not authorized to perform this action"
    }
    return res.json({ status, message })
}

// this below function is used to print the reciept
router.fetchSalesDetail = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let { id } = req.params;
    let sale_header = {};
    let sale_items = [];
    let restaurent_detail = {};

    await knex("sale_start").where("id", id).where('restaurent_id', req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            sale_header = response[0];
            status = 200;
            message = "Sale record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    await knex("sale_items").where("sale_start_id", id).where('restaurent_id', req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            sale_items = response;
            status = 200;
            message = "Sale Entry record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    await knex('restaurents').where('id', req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            restaurent_detail = response[0];
            status = 200;
            message = "Sale Entry record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, sale_header, sale_items, restaurent_detail })
}

router.fetchSalesList = async(req,res)=>{
    let status = 500;
    let message = 'Oops something went wrong!';
    let list = [];

    let default_query = "select * from sale_start";
    let sort = "";
    let total_records = "";

    let count_query = "select COUNT(*) as total from sale_start";
    
    if (req.query.sort_order) {
        sort = JSON.parse(req.query.sort_order);
    }

    let filter_query = ` where sale_start.restaurent_id='${req.user_data.restaurent_id}'`;

    if(req.query.filter_value){
        filter_query += ` and (sale_start.invoice_number LIKE '%${req.query.filter_value}%' or sale_start.customer_name LIKE '%${req.query.filter_value}%' or sale_start.total_after_roundoff LIKE '%${req.query.filter_value}%' or sale_start.payment_type LIKE '%${req.query.filter_value}%')`
    }
    if(req.query.to && req.query.from){
        let date_from = HELPERS.formatDate(req.query.from);
        let date_to = HELPERS.formatDate(req.query.to);
        filter_query += ` and ((sale_start.sale_date BETWEEN '${req.query.from}' AND '${req.query.to}') or (sale_start.sale_date BETWEEN '${date_from}' AND '${date_to}'))`;
    }
    
    let order_by_query = " order by sale_start.id desc LIMIT 10 offset 0";

    if (req.query.page_number && req.query.page_size) {
        let offset = (req.query.page_number - 1) * (req.query.page_size);
        order_by_query = ` order by sale_start.id desc LIMIT ${req.query.page_size} offset ${offset}`;
        if (sort) {
            order_by_query = ` order by sale_start.${sort.column} ${sort.order} LIMIT ${req.query.page_size} offset ${offset}`;
        }
    }

    await knex.raw(default_query + filter_query + order_by_query).then(async response => {
        if (response[0]) {
            list = response[0];
            await knex.raw(count_query + filter_query).then(response1 => {
                if (response1[0]) {
                    total_records = response1[0][0].total;
                }
            }).catch((err) => console.log(err));
            status = 200;
            message = "Sale List has been fetched successfully";
        }
    }).catch((err) => console.log(err));

    return res.json({status, message, list, total_records})

}

module.exports = router;
