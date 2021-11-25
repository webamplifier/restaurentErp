const express = require("express");
const router = express.Router();
const HELPERS = require('../Helpers/helpers')

// this below function is used to get the list of sales
router.list = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let sale_list = [];

    await knex("sale_start").where('restaurent_id', req.user_data.restaurent_id).then(response => {
        sale_list = response;
        status = 200;
        message = "Sale record has been fetched!"
    }).catch(err => console.log(err))

    return res.json({ status, message, sale_list })
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

    let create = {
        uuid: await HELPERS.getKnexUuid(knex),
        restaurent_id: req.user_data.restaurent_id,
        invoice_number: header.invoiceNo,
        sale_date: header?.saleDate ? header?.saleDate : await HELPERS.dateTime(),
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
        status: 2,
    };

    await knex("sale_start").where('restaurent_id', req.user_data.restaurent_id).insert(create, "id").then(response => {
        sale_start_id = response[0];
    }).catch(err => console.log(err))

    if (sale_start_id) {
        for (let i = 0; i < items.length; i++) {
            let data = items[i];
            let item_id = 0;

            await knex("products").where("id", data.item.value).where('restaurent_id', req.user_data.restaurent_id).then(async responseProduct => {
                if (responseProduct) {
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
                }
            })

        }
    }


    return res.json({ status, message })

}


// this below route is used to fetch the details
router.fetchById = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let id = req.params.id;
    let sale_header = {};
    let sale_items = [];

    if (req.user_data.role == 2 || req.user_data.role == 1) {

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
                message = "Purchase record has been fetched successfully"
            }
        }).catch(err => console.log(err))
    }
    else {
        status = 300;
        message = "You are not authorized to perform this action"
    }
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

    if (req.user_data.role == 2 || req.user_data.role == 1) {

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
            status: 2,
        };

        await knex("sale_items").where("sale_start_id", sale_start_id).where('restaurent_id', req.user_data.restaurent_id).then(response => {
            for (let i = 0; i < response.length; i++) {
                past_items_id.push(response[i].id)
            }
        }).catch(err => console.log(err))

        await knex("sale_start").where("id", id).where('restaurent_id', req.user_data.restaurent_id).update(update).then(response => {
            status = 200;
            message = "Sale has been updated successfully!"
        }).catch(err => console.log(err))

        if (sale_start_id) {
            for (let i = 0; i < items.length; i++) {
                let data = items[i];

                if (data.item_id) {

                    // this condition if item already exists

                    for (let j = 0; j < past_items_id.length; j++) {
                        if (data.item_id == past_items_id[j]) {
                            // 
                        } else {
                            new_items_id.push(past_items_id[j])
                        }
                    }

                    let item_obj = {
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
                        amount_before_discount: 0,//their is no any option for discount for items in this project
                        discount_percent: 0,//their is no any option for discount for items in this project
                        amount_after_discount: 0,//their is no any option for discount for items in this project
                        discount_amount: 0,//their is no any option for discount for items in this project
                        total: data.total
                    }

                    await knex("sale_items").where("id", data.item_id).where('restaurent_id', req.user_data.restaurent_id).update(item_obj).then(response => {
                        if (response[0]) {
                            status = 200;
                            message = "Sale has been created successfully!"
                        }
                    }).catch(err => console.log(err))
                } else {

                    // this condition if item is new 


                    let item_id = 0;
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
                        amount_before_discount: 0,//their is no any option for discount for items in this project
                        discount_percent: 0,//their is no any option for discount for items in this project
                        amount_after_discount: 0,//their is no any option for discount for items in this project
                        discount_amount: 0,//their is no any option for discount for items in this project
                        total: data.total
                    }

                    await knex("sale_items").where('restaurent_id', req.user_data.restaurent_id).insert(item_obj, "id").then(response => {
                        if (response[0]) {
                            item_id = response[0];
                            status = 200;
                            message = "Sale has been created successfully!"
                        }
                    }).catch(err => console.log(err))
                }
            }

            if (new_items_id.length > 0) {
                for (let k = 0; k < new_items_id.length; k++) {
                    await knex("sale_items").where("id", new_items_id[k]).where('restaurent_id', req.user_data.restaurent_id).del().then(response => {
                        status = 200;
                        message = "Sale has been updated successfully!"
                    })
                }
            }
        }
        else {
            status = 300;
            message = "You are not authorized to perform this action"
        }
        return res.json({ status, message })

    }
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

module.exports = router;