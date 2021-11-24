const express = require("express");
const router = express.Router();
const HELPERS = require('../Helpers/helpers')

// this below function is used to get the list of sales
router.list = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let sale_list = [];
       
    await knex("sale_start").where('restaurent_id',req.user_data.restaurent_id).then(response => {
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
        sale_date: await HELPERS.dateTime(),
        customer_name: header.customer,
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
        status: 2,//status 1 means unpaid 2 means paid
    };

    await knex("sale_start").where('restaurent_id',req.user_data.restaurent_id).insert(create, "id").then(response => {
        sale_start_id = response[0];
    }).catch(err => console.log(err))

    if (sale_start_id) {
        for (let i = 0; i < items.length; i++) {
            let data = items[i];
            let item_id = 0;

            await knex("products").where("id", data.item.value).where('restaurent_id',req.user_data.restaurent_id).then(async responseProduct => {
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

                    await knex("sale_items").where('restaurent_id',req.user_data.restaurent_id).insert(item_obj, "id").then(response => {
                        if (response[0]) {
                            item_id = response[0];
                            status = 200;
                            message = "Sale has been created successfully!"
                        }
                    }).catch(err => console.log(err))

                    // if (data.item.type == "product" && item_id) {
                    //     let purchase_qty_sales_unit = parseFloat(data.qty) * parseFloat(responseProduct[0].sales_unit)
                    //     let inventory_obj = {
                    //         uuid: await HELPERS.getKnexUuid(knex),
                    //         product_id: data.item.value,
                    //         product_name: data.item.label,
                    //         total_qty: purchase_qty_sales_unit,
                    //         purchase_qty: purchase_qty_sales_unit,
                    //         mrp: 0,
                    //         purchase_price: data.purchase_price,
                    //         party_id: header.currentParty.value,
                    //         party_name: header.currentParty.label,
                    //         purchaseitem_id: item_id
                    //     }

                    //     await knex("inventories").insert(inventory_obj).then(response1 => {
                    //         if (response1) {
                    //             status = 200;
                    //             message = "Purchase entry has been created successfully!"
                    //         }
                    //     }).catch(err => console.log(err))
                    // }
                }
            })

        }

        // if (final.paidAmount && parseFloat(final.paidAmount) > 0){
        //     let current_date = new Date();
        //     let date_string = `${current_date.getDate()}-${current_date.getMonth()}-${current_date.getFullYear()}`
        //     let reciept_obj = {
        //         uuid : await HELPERS.getKnexUuid(knex),
        //         condition : 2,
        //         type : 1,
        //         reference_id : purchase_start_id,
        //         amount : final.paidAmount,
        //         date : date_string,
        //         payment_type : final.paymentMethod
        //     }

        //     await knex("reciepts").insert(reciept_obj).then(responseReciept=>{
        //         if (responseReciept){
        //             status = 200;
        //             message = "Reciept has been created successfully!"
        //         }
        //     }).catch(err=>console.log(err))
        // }
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

    await knex("sale_start").where("id", id).where('restaurent_id',req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            sale_header = response[0];
            status = 200;
            message = "Sale record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    await knex("sale_items").where("sale_start_id", id).where('restaurent_id',req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            sale_items = response;
            status = 200;
            message = "Purchase record has been fetched successfully"
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

    await knex("sale_items").where("sale_start_id", sale_start_id).where('restaurent_id',req.user_data.restaurent_id).then(response => {
        for (let i = 0; i < response.length; i++) {
            past_items_id.push(response[i].id)
        }
    }).catch(err => console.log(err))

    await knex("sale_start").where("id", id).where('restaurent_id',req.user_data.restaurent_id).update(update).then(response => {
        // 
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

                await knex("sale_items").where("id", data.item_id).where('restaurent_id',req.user_data.restaurent_id).update(item_obj).then(response => {
                    if (response[0]) {
                        status = 200;
                        message = "Sale has been created successfully!"
                    }
                }).catch(err => console.log(err))

                // if (data.item.type == "product" && data.item_id) {

                //     let inventory_obj = {
                //         product_id: data.item.value,
                //         product_name: data.item.label,
                //         total_qty: data.qty,
                //         purchase_qty: data.qty,
                //         mrp: data.mrp,
                //         purchase_price: data.purchase_price,
                //         party_id: header.currentParty.value,
                //         party_name: header.currentParty.label,
                //         purchaseitem_id: item_id
                //     }

                //     await knex("inventories").where("item_id", id).update(inventory_obj).then(response1 => {
                //         if (response1) {
                //             status = 200;
                //             message = "Purchase entry has been created successfully!"
                //         }
                //     }).catch(err => console.log(err))


                // }
            } else {

                // this condition if item is new 


                let item_id = 0;
                let item_obj = {
                    uuid: await HELPERS.getKnexUuid(knex),
                    purchase_start_id: purchase_start_id,
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

                await knex("sale_items").where('restaurent_id',req.user_data.restaurent_id).insert(item_obj, "id").then(response => {
                    if (response[0]) {
                        item_id = response[0];
                        status = 200;
                        message = "Sale has been created successfully!"
                    }
                }).catch(err => console.log(err))

                // if (data.item.type == "product" && item_id) {
                //     let inventory_obj = {
                //         uuid: await HELPERS.getKnexUuid(knex),
                //         product_id: data.item.value,
                //         product_name: data.item.label,
                //         total_qty: data.qty,
                //         purchase_qty: data.qty,
                //         mrp: 0,
                //         purchase_price: data.purchase_price,
                //         party_id: header.currentParty.value,
                //         party_name: header.currentParty.label,
                //         purchaseitem_id: item_id
                //     }

                //     await knex("inventories").insert(inventory_obj).then(response1 => {
                //         if (response1) {
                //             status = 200;
                //             message = "Purchase entry has been created successfully!"
                //         }
                //     }).catch(err => console.log(err))
                // }
            }
        }

        if (new_items_id.length > 0) {
            for (let k = 0; k < new_items_id.length; k++) {
                await knex("sale_items").where("id", new_items_id[k]).where('restaurent_id',req.user_data.restaurent_id).del().then(response => {
                    status = 200;
                    message = "Sale has been updated successfully!"
                })
            }
        }
        
        // if (final.paidAmount && parseFloat(final.paidAmount) > 0){
        //     let current_date = new Date();
        //     let date_string = `${current_date.getDate()}-${current_date.getMonth()}-${current_date.getFullYear()}`
            
        //     await knex("reciepts").where("type",1).where("reference_id",purchase_start_id).then(async response=>{
        //         if (response.length > 0){
        //             let reciept_obj = {
        //                 condition : 2,
        //                 type : 1,
        //                 reference_id : purchase_start_id,
        //                 amount : final.paidAmount,
        //                 date : date_string,
        //                 payment_type : final.paymentMethod
        //             }
        
        //             await knex("reciepts").where("id",response[0].id).update(reciept_obj).then(responseReciept=>{
        //                 if (responseReciept){
        //                     status = 200;
        //                     message = "Reciept has been created successfully!"
        //                 }
        //             }).catch(err=>console.log(err))
        //         }else{
        //             let reciept_obj = {
        //                 uuid : await HELPERS.getKnexUuid(knex),
        //                 condition : 2,
        //                 type : 1,
        //                 reference_id : purchase_start_id,
        //                 amount : final.paidAmount,
        //                 date : date_string,
        //                 payment_type : final.paymentMethod
        //             }
        
        //             await knex("reciepts").insert(reciept_obj).then(responseReciept=>{
        //                 if (responseReciept){
        //                     status = 200;
        //                     message = "Reciept has been created successfully!"
        //                 }
        //             }).catch(err=>console.log(err)) 
        //         }
        //     })
            
        // }

        return res.json({ status, message })

    }
}


// this below function is used to delete the purchase
router.delete = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let id = req.params.id;

    await knex("sale_start").where("id", id).where('restaurent_id',req.user_data.restaurent_id).del().then(response => {
        if (response) {
            status = 200;
            message = "Sale start has been deleted!"
        }
    }).catch(err => console.log(err))

    await knex("sale_items").where("sale_start_id", id).where('restaurent_id',req.user_data.restaurent_id).del().then(response => {
        if (response) {
            status = 200;
            message = "Sale items has been deleted!"
        }
    }).catch(err => console.log(err))

    return res.json({ status, message })
}

module.exports = router;