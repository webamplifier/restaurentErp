const express = require("express");
const router = express.Router();
const HELPERS = require('../Helpers/helpers')

// this below function is used to get the list of purchase
router.list = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let purchase_list = [];

    await knex("purchase_start").then(response => {
        purchase_list = response;
        status = 200;
        message = "Purchase record has been fetched!"
    }).catch(err => console.log(err))

    return res.json({ status, message, purchase_list })
}

// this below function is used to create purchase entry
router.create = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let inputs = req.body;
    let purchase_start_id = 0;


    let header = JSON.parse(inputs.final_array)[0];
    let final = JSON.parse(inputs.final_array)[1];

    let items = JSON.parse(inputs.allItems)

    let create = {
        uuid: await HELPERS.getKnexUuid(knex),
        invoice_number: header.invoiceNo,
        purchase_date: header.purchaseDate,
        party_id: header.currentParty.value,
        party_name: header.currentParty.label,
        total_supply: final.totalValue,
        item_discount_percentage: '',
        item_discount_amount: final.discountAmount,
        bill_discount_percentage: final.finalDiscountCriteria == "percent" ? final.finalDiscountValue : '',
        bill_discount_amount: final.finalDiscountCriteria == "amount" ? final.finalDiscountValue : '',
        total_before_roundoff: final.finalAmount,
        total_after_roundoff: final.finalAmount,
        roundoff: 0, //round off 0 becuase we are not performing round off here
        discount_type: header.discountType,
        taxable_amount: 0, //tax is not included that's why tax amount is zero
        remarks: final.remarks,
        amount_paid: final.paidAmount,
        payment_type: final.paymentMethod,
        remain_amount: final.remainAmount,
        remain_amount_date: final.remainPaymentDate,
        status: parseFloat(final.remainAmount) > 0 ? 1 : 2,
    };

    await knex("purchase_start").insert(create, "id").then(response => {
        purchase_start_id = response[0];
    }).catch(err => console.log(err))

    if (purchase_start_id) {
        for (let i = 0; i < items.length; i++) {
            let data = items[i];
            let item_id = 0;

            await knex("products").where("id", data.item.value).then(async responseProduct => {
                if (responseProduct) {
                    let item_obj = {
                        uuid: await HELPERS.getKnexUuid(knex),
                        purchase_start_id: purchase_start_id,
                        product_id: data.item.value,
                        product_name: data.item.label,
                        description: data.description,
                        purchase_price: data.purchase_price,
                        qty: data.qty,
                        mrp: data.mrp,
                        free_qty: 0, //their is no any option for free in this project
                        amount_before_tax: 0,//their is no any option for tax in this project
                        tax_percent: 0,//their is no any option for tax in this project
                        amount_after_tax: 0,//their is no any option for tax in this project
                        tax_amount: 0,//their is no any option for tax in this project
                        amount_before_discount: data.amount_before_discount,
                        discount_percent: data.discount_type == "percent" && data.discountValue,
                        amount_after_discount: data.amount_after_discount,
                        discount_amount: data.discount_amount,
                        total: data.total
                    }

                    await knex("purchase_items").insert(item_obj, "id").then(response => {
                        if (response[0]) {
                            item_id = response[0];
                            status = 200;
                            message = "Purchase has been created successfully!"
                        }
                    }).catch(err => console.log(err))

                    if (data.item.type == "product" && item_id) {
                        let purchase_qty_sales_unit = parseFloat(data.qty) * parseFloat(responseProduct[0].sales_unit)
                        let inventory_obj = {
                            uuid: await HELPERS.getKnexUuid(knex),
                            product_id: data.item.value,
                            product_name: data.item.label,
                            total_qty: purchase_qty_sales_unit,
                            purchase_qty: purchase_qty_sales_unit,
                            mrp: 0,
                            purchase_price: data.purchase_price,
                            party_id: header.currentParty.value,
                            party_name: header.currentParty.label,
                            purchaseitem_id: item_id
                        }

                        await knex("inventories").insert(inventory_obj).then(response1 => {
                            if (response1) {
                                status = 200;
                                message = "Purchase entry has been created successfully!"
                            }
                        }).catch(err => console.log(err))
                    }
                }
            })

        }

        if (final.paidAmount && parseFloat(final.paidAmount) > 0){
            let current_date = new Date();
            let date_string = `${current_date.getDate()}-${current_date.getMonth()}-${current_date.getFullYear()}`
            let reciept_obj = {
                uuid : await HELPERS.getKnexUuid(knex),
                condition : 2,
                type : 1,
                reference_id : purchase_start_id,
                amount : final.paidAmount,
                date : date_string,
                payment_type : final.paymentMethod
            }

            await knex("reciepts").insert(reciept_obj).then(responseReciept=>{
                if (responseReciept){
                    status = 200;
                    message = "Reciept has been created successfully!"
                }
            }).catch(err=>console.log(err))
        }
    }

    
    return res.json({ status, message })

}


// this below route is used to fetch the details
router.fetchById = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let id = req.params.id;
    let purchase_header = {};
    let purchase_items = [];

    await knex("purchase_start").where("id", id).then(response => {
        if (response.length > 0) {
            purchase_header = response[0];
            status = 200;
            message = "Purchase record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    await knex("purchase_items").where("purchase_start_id", id).then(response => {
        if (response.length > 0) {
            purchase_items = response;
            status = 200;
            message = "Purchase record has been fetched successfully"
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, purchase_header, purchase_items })
}

// this below function is used to update the purchase

router.update = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let inputs = req.body;
    let id = req.params.id;
    let purchase_start_id = req.params.id;

    let header = JSON.parse(inputs.final_array)[0];
    let final = JSON.parse(inputs.final_array)[1];

    let past_items_id = [];
    let new_items_id = [];

    let items = JSON.parse(inputs.allItems)

    let update = {
        invoice_number: header.invoiceNo,
        purchase_date: header.purchaseDate,
        party_id: header.currentParty.value,
        party_name: header.currentParty.label,
        total_supply: final.totalValue,
        item_discount_percentage: '',
        item_discount_amount: final.discountAmount,
        bill_discount_percentage: final.finalDiscountCriteria == "percent" ? final.finalDiscountValue : '',
        bill_discount_amount: final.finalDiscountCriteria == "amount" ? final.finalDiscountValue : '',
        total_before_roundoff: final.finalAmount,
        total_after_roundoff: final.finalAmount,
        roundoff: 0, //round off 0 becuase we are not performing round off here
        discount_type: header.discountType,
        taxable_amount: 0, //tax is not included that's why tax amount is zero
        remarks: final.remarks,
        amount_paid: final.paidAmount,
        payment_type: final.paymentMethod,
        remain_amount: final.remainAmount,
        remain_amount_date: final.remainPaymentDate,
        status: parseFloat(final.remainAmount) > 0 ? 1 : 2,
    };

    await knex("purchase_items").where("purchase_start_id", purchase_start_id).then(response => {
        for (let i = 0; i < response.length; i++) {
            past_items_id.push(response[i].id)
        }
    }).catch(err => console.log(err))

    await knex("purchase_start").where("id", id).update(update).then(response => {
        // 
    }).catch(err => console.log(err))

    if (purchase_start_id) {
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
                    purchase_price: data.purchase_price,
                    qty: data.qty,
                    mrp: data.mrp,
                    free_qty: 0, //their is no any option for free in this project
                    amount_before_tax: 0,//their is no any option for tax in this project
                    tax_percent: 0,//their is no any option for tax in this project
                    amount_after_tax: 0,//their is no any option for tax in this project
                    tax_amount: 0,//their is no any option for tax in this project
                    amount_before_discount: data.amount_before_discount,
                    discount_percent: data.discount_type == "percent" && data.discountValue,
                    amount_after_discount: data.amount_after_discount,
                    discount_amount: data.discount_amount,
                    total: data.total
                }

                await knex("purchase_items").where("id", data.item_id).update(item_obj).then(response => {
                    if (response[0]) {
                        status = 200;
                        message = "Purchase has been created successfully!"
                    }
                }).catch(err => console.log(err))

                if (data.item.type == "product" && data.item_id) {

                    let inventory_obj = {
                        product_id: data.item.value,
                        product_name: data.item.label,
                        total_qty: data.qty,
                        purchase_qty: data.qty,
                        mrp: data.mrp,
                        purchase_price: data.purchase_price,
                        party_id: header.currentParty.value,
                        party_name: header.currentParty.label,
                        purchaseitem_id: item_id
                    }

                    await knex("inventories").where("item_id", id).update(inventory_obj).then(response1 => {
                        if (response1) {
                            status = 200;
                            message = "Purchase entry has been created successfully!"
                        }
                    }).catch(err => console.log(err))


                }
            } else {

                // this condition if item is new 


                let item_id = 0;
                let item_obj = {
                    uuid: await HELPERS.getKnexUuid(knex),
                    purchase_start_id: purchase_start_id,
                    product_id: data.item.value,
                    product_name: data.item.label,
                    description: data.description,
                    purchase_price: data.purchase_price,
                    qty: data.qty,
                    mrp: data.mrp,
                    free_qty: 0, //their is no any option for free in this project
                    amount_before_tax: 0,//their is no any option for tax in this project
                    tax_percent: 0,//their is no any option for tax in this project
                    amount_after_tax: 0,//their is no any option for tax in this project
                    tax_amount: 0,//their is no any option for tax in this project
                    amount_before_discount: data.amount_before_discount,
                    discount_percent: data.discount_type == "percent" && data.discountValue,
                    amount_after_discount: data.amount_after_discount,
                    discount_amount: data.discount_amount,
                    total: data.total
                }

                await knex("purchase_items").insert(item_obj, "id").then(response => {
                    if (response[0]) {
                        item_id = response[0];
                        status = 200;
                        message = "Purchase has been created successfully!"
                    }
                }).catch(err => console.log(err))

                if (data.item.type == "product" && item_id) {
                    let inventory_obj = {
                        uuid: await HELPERS.getKnexUuid(knex),
                        product_id: data.item.value,
                        product_name: data.item.label,
                        total_qty: data.qty,
                        purchase_qty: data.qty,
                        mrp: 0,
                        purchase_price: data.purchase_price,
                        party_id: header.currentParty.value,
                        party_name: header.currentParty.label,
                        purchaseitem_id: item_id
                    }

                    await knex("inventories").insert(inventory_obj).then(response1 => {
                        if (response1) {
                            status = 200;
                            message = "Purchase entry has been created successfully!"
                        }
                    }).catch(err => console.log(err))
                }
            }
        }

        if (new_items_id.length > 0) {
            for (let k = 0; k < new_items_id.length; k++) {
                await knex("purchase_items").where("id", new_items_id[k]).del().then(response => {
                    status = 200;
                    message = "Purchase has been updated successfully!"
                })
            }
        }
        
        if (final.paidAmount && parseFloat(final.paidAmount) > 0){
            let current_date = new Date();
            let date_string = `${current_date.getDate()}-${current_date.getMonth()}-${current_date.getFullYear()}`
            
            await knex("reciepts").where("type",1).where("reference_id",purchase_start_id).then(async response=>{
                if (response.length > 0){
                    let reciept_obj = {
                        condition : 2,
                        type : 1,
                        reference_id : purchase_start_id,
                        amount : final.paidAmount,
                        date : date_string,
                        payment_type : final.paymentMethod
                    }
        
                    await knex("reciepts").where("id",response[0].id).update(reciept_obj).then(responseReciept=>{
                        if (responseReciept){
                            status = 200;
                            message = "Reciept has been created successfully!"
                        }
                    }).catch(err=>console.log(err))
                }else{
                    let reciept_obj = {
                        uuid : await HELPERS.getKnexUuid(knex),
                        condition : 2,
                        type : 1,
                        reference_id : purchase_start_id,
                        amount : final.paidAmount,
                        date : date_string,
                        payment_type : final.paymentMethod
                    }
        
                    await knex("reciepts").insert(reciept_obj).then(responseReciept=>{
                        if (responseReciept){
                            status = 200;
                            message = "Reciept has been created successfully!"
                        }
                    }).catch(err=>console.log(err)) 
                }
            })
            
        }

        return res.json({ status, message })

    }
}


// this below function is used to delete the purchase
router.delete = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let id = req.params.id;

    await knex("purchase_start").where("id", id).del().then(response => {
        if (response) {
            status = 200;
            message = "Purchase start has been deleted!"
        }
    }).catch(err => console.log(err))

    await knex("purchase_items").where("purchase_start_id", id).del().then(response => {
        if (response) {
            status = 200;
            message = "Purchase start has been deleted!"
        }
    }).catch(err => console.log(err))

    return res.json({ status, message })
}

module.exports = router;