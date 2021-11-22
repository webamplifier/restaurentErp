const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to grab the estimation needs
router.fetchSalesNeeds = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let product_inventory_based = [];
    let all_customers = [];
    let new_invoice = 0;
    let all_vehicles = []
    let all_bikes = HELPERS.bike_type;
    let all_service_location = HELPERS.service_location

    await knex('vehicles').orderBy('id', 'desc').then(response => {
        if (response) {
            all_vehicles = response;
        }
    }).catch(err => console.log(err))

    await knex('products').then(async response => {
        if (response.length > 0) {
            product_inventory_based = response;
        }
    })

    await knex('estimation_start').orderBy('id', 'desc').then(response => {
        if (response.length > 0) {
            new_invoice = response[0].estimation_number
        }
    }).catch(err => console.log(err))

    await knex('companies').then(response => {
        if (response.length > 0) {
            all_customers = response;
            status = 200;
            message = 'Customers has been fetched successfully!';
        }
    }).catch(err => console.log(err))

    return res.json({ all_service_location,all_bikes,all_vehicles, status, message, product_inventory_based, all_customers, new_invoice: parseInt(new_invoice) + 1 })
}

// this below function is used to create the estimation
router.create = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';

    let inputs = req.body;
    let final_arr = JSON.parse(inputs.final_array);
    let all_items = JSON.parse(inputs.allItems);
    let past_invoice_data = 0;
    let company_data = {};

    



    await knex('estimation_start').orderBy('id', 'desc').then(response => {
        if (response.length > 0) {
            past_invoice_data = response[0].estimation_number;
        }
    }).catch(err => console.log(err))

    await knex('companies').where('id',final_arr[0].currentParty.value).then(response=>{
        if (response.length > 0){
            company_data = response[0];
        }
    })


    if (past_invoice_data || past_invoice_data == 0) {
        let new_invoice_created_id = '';
        let create_sales_header = {
            uuid: await HELPERS.getKnexUuid(knex),
            estimation_number: parseInt(past_invoice_data) + 1,
            estimation_date: final_arr[0].purchaseDate,
            company_id: final_arr[0].currentParty.value,
            company_name: final_arr[0].currentParty.label,
            vehicle_id: final_arr[0].currentVehilce.value,
            vehicle_name: final_arr[0].currentVehilce.label,
            vehicle_location: final_arr[0].vehicleLocation,
            bike_type : final_arr[0].currentBike,
            km_driven : final_arr[0].kmDriven,
            driver_name : final_arr[0].driverName,
            phone_number : final_arr[0].phoneNumber,
            mechanic_name : final_arr[0].mechanicName,
            total_supply: final_arr[1].totalValue,
            item_discount_amount: final_arr[0].discountAmount,
            bill_discount_percentage: final_arr[1].finalDiscountCriteria == 'amount' ? '' : final_arr[1].finalDiscountValue,
            bill_discount_amount: final_arr[1].finalDiscountCriteria == 'amount' ? final_arr[1].finalDiscountValue : '',
            total_before_roundoff: final_arr[1].finalAmount,
            total_after_roundoff: final_arr[1].roundOffTotal,
            round_off: (parseFloat(final_arr[1].finalAmount) - parseFloat(final_arr[1].roundOffTotal)).toString(),
            discount_type: final_arr[0].discountType,
            taxable_amount: final_arr[1].taxableAmount,
            remarks: final_arr[1].remarks,
            status: 1,
            created_by: 1,
            created_at: HELPERS.dateTime(),
        }

        await knex('estimation_start').insert(create_sales_header, 'id').then(response => {
            if (response.length > 0) {
                new_invoice_created_id = response[0];
                status = 200;
                message = 'Estimation has been created successfully!'
            }
        }).catch(err => console.log(err))

        if (new_invoice_created_id) {
            for (let i = 0; i < all_items.length; i++) {
                let current_item = all_items[i];

                let sales_item_obj = {
                    uuid: await HELPERS.getKnexUuid(knex),
                    status: 1,
                    estimation_start_id: new_invoice_created_id,
                    product_id: current_item.item.value,
                    product_name: current_item.item.product_name,
                    product_category_name: current_item.item.category_name,
                    description: current_item.description,
                    item_type: current_item.item.inventory_id ? 'product' : 'service',
                    sales_price: current_item.cost_per_unit,
                    qty: current_item.qty,
                    free_qty: current_item.free,
                    amount_before_tax: current_item.amount_before_tax_item,
                    tax_percent: current_item.tax,
                    amount_after_tax: current_item.amount_after_tax_item,
                    tax_amount: current_item.tax_amount_item,
                    amount_before_discount: current_item.amount_before_discount,
                    discount_percent: current_item.discount_type == 'percent' ? current_item.discountValue : 'NA',
                    amount_after_discount: current_item.amount_after_discount,
                    discount_amount: current_item.discount_amount,
                    total: current_item.total,
                    created_by: 1,
                    created_at: HELPERS.dateTime()
                }

                await knex('estimation_item').insert(sales_item_obj).then(response => {
                    if (response) {
                        status = 200;
                        message = 'Sales item has been created'
                    }
                }).catch(err => console.log(err))
            }

            console.log(parseInt(company_data.due_amount) + parseInt(final_arr[1].roundOffTotal))
            await knex('companies').where('id',final_arr[0].currentParty.value).update({
                'due_amount' : parseInt(company_data.due_amount) + parseInt(final_arr[1].roundOffTotal)
            }).then(res=>{
                status = 200;
                message = "Due Amount updated successfully"
            })
        }

    }

    return res.json({ status, message })
}

// this below will get the list of estimation
router.list = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let sales_data = [];
    let company_list = [];
    let vehicle_list = [];

    await knex('companies').then(response=>{
        if (response){
            company_list = response;
        }
    }).catch(err=>console.log(err))

    await knex('vehicles').then(response=>{
        if (response){
            vehicle_list = response;
        }
    }).catch(err=>console.log(err))

    await knex('estimation_start').orderBy('id','desc').then(async response => {
        if (response) {
            sales_data = response;
            status = 200;
            message = 'Sales data has been fetched successfully!';
            for (let i=0;i<sales_data.length;i++){
                await knex('estimation_item').where('estimation_start_id',sales_data[i].id).then(response1=>{
                    sales_data[i]['items'] = response1;
                })
            }
        }
    }).catch(err => console.log(err))

    return res.json({ company_list,vehicle_list,status, message, sales_data })

}

// this below function is used to get the detail of estimation
router.getDetailById = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;

    let sales_header = {};
    let sales_items = [];

    await knex('estimation_start').where('id', id).then(response => {
        if (response.length > 0) {
            sales_header = response[0];
            status = 200;
            message = 'Sales header has been fetched successfully!';
        }
    }).catch(err =>
        console.log(err)
    );

    await knex('estimation_item').where('estimation_start_id', id).where('status',1).then(response => {
        if (response.length > 0) {
            sales_items = response;
            status = 200;
            message = 'Sales item has been fetched succesfully!';
        }
    }).catch(err => console.log(err));

    return res.json({ status, message, sales_items, sales_header })
}

// this below function is used to update the estimation
router.update = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;

    let inputs = req.body;
    let final_arr = JSON.parse(inputs.final_array);
    let all_items = JSON.parse(inputs.allItems);
    let past_invoice_data = 0;
    let past_item_data = [];

    let company_data = {};

    await knex('estimation_item').where('estimation_start_id',id).where('status',1).then(response=>{
        if (response){
            past_item_data = response;
        }
    }).catch(err=>console.log(err))

    

    if (past_invoice_data || past_invoice_data == 0) {
        let new_invoice_created_id = '';
        let create_sales_header = {
            estimation_number: final_arr[0].invoiceNo,
            estimation_date: final_arr[0].purchaseDate,
            company_id: final_arr[0].currentParty.value,
            company_name: final_arr[0].currentParty.label,
            vehicle_id: final_arr[0].currentVehilce.value,
            vehicle_name: final_arr[0].currentVehilce.label,
            vehicle_location: final_arr[0].vehicleLocation,
            bike_type : final_arr[0].currentBike,
            km_driven : final_arr[0].kmDriven,
            driver_name : final_arr[0].driverName,
            phone_number : final_arr[0].phoneNumber,
            mechanic_name : final_arr[0].mechanicName,
            total_supply: final_arr[1].totalValue,
            item_discount_amount: final_arr[0].discountAmount,
            bill_discount_percentage: final_arr[1].finalDiscountCriteria == 'amount' ? '' : final_arr[1].finalDiscountValue,
            bill_discount_amount: final_arr[1].finalDiscountCriteria == 'amount' ? final_arr[1].finalDiscountValue : '',
            total_before_roundoff: final_arr[1].finalAmount,
            total_after_roundoff: final_arr[1].roundOffTotal,
            round_off: (parseFloat(final_arr[1].finalAmount) - parseFloat(final_arr[1].roundOffTotal)).toString(),
            discount_type: final_arr[0].discountType,
            taxable_amount: final_arr[1].taxableAmount,
            remarks: final_arr[1].remarks,
            status: 1,
            updated_by: 1,
            updated_at: HELPERS.dateTime()
        }

        await knex('estimation_start').where('id', id).update(create_sales_header).then(response => {
            if (response.length > 0) {
                status = 200;
                message = 'Estimation has been edited successfully!'
            }
        }).catch(err => console.log(err))

        if (id) {
            for (let i = 0; i < all_items.length; i++) {
                let current_item = all_items[i];

                if (current_item.item_id) {
                    let new_updt_arr = [];
                    for (let k=0;k < past_item_data.length;k++){
                        if (past_item_data[k].id == current_item.item_id){
                            // 
                        }else{
                            new_updt_arr.push(past_item_data[k])
                        }
                    }

                    past_item_data = new_updt_arr;
                    let sales_item_obj = {
                        status: 1,
                        product_id: current_item.item.value,
                        product_name: current_item.item.label,
                        product_category_name: current_item.item.category_name,
                        description: current_item.description,
                        item_type: current_item.item.inventory_id ? 'product' : 'service',
                        sales_price: current_item.cost_per_unit,
                        qty: current_item.qty,
                        free_qty: current_item.free,
                        amount_before_tax: current_item.amount_before_tax_item,
                        tax_percent: current_item.tax,
                        amount_after_tax: current_item.amount_after_tax_item,
                        tax_amount: current_item.tax_amount_item,
                        amount_before_discount: current_item.amount_before_discount,
                        discount_percent: current_item.discount_type == 'percent' ? current_item.discountValue : 'NA',
                        amount_after_discount: current_item.amount_after_discount,
                        discount_amount: current_item.discount_amount,
                        total: current_item.total,
                        updated_by: 1,
                        updated_at: HELPERS.dateTime()
                    }

                    await knex('estimation_item').where('id',current_item.item_id).update(sales_item_obj).then(response => {
                        if (response) {
                            status = 200;
                            message = 'Estimation item has been updated successfully'
                        }
                    }).catch(err => console.log(err))
                } else {
                    let sales_item_obj = {
                        uuid: await HELPERS.getKnexUuid(knex),
                        status: 1,
                        estimation_start_id : id,
                        product_id: current_item.item.value,
                        product_name: current_item.item.product_name,
                        inventory_id : current_item.item.inventory_id,
                        product_category_name: current_item.item.category_name,
                        description: current_item.description,
                        item_type: current_item.item.inventory_id ? 'product' : 'service',
                        sales_price: current_item.cost_per_unit,
                        qty: current_item.qty,
                        free_qty: current_item.free,
                        amount_before_tax: current_item.amount_before_tax_item,
                        tax_percent: current_item.tax,
                        amount_after_tax: current_item.amount_after_tax_item,
                        tax_amount: current_item.tax_amount_item,
                        amount_before_discount: current_item.amount_before_discount,
                        discount_percent: current_item.discount_type == 'percent' ? current_item.discountValue : 'NA',
                        amount_after_discount: current_item.amount_after_discount,
                        discount_amount: current_item.discount_amount,
                        total: current_item.total,
                        created_by: 1,
                        created_at: HELPERS.dateTime()
                    }

                    await knex('estimation_item').insert(sales_item_obj).then(response => {
                        if (response) {
                            status = 200;
                            message = 'Sales item has been created'
                        }
                    }).catch(err => console.log(err))
                }

            }
        }

    }

    if (past_item_data.length > 0){
        for (let j=0;j<past_item_data.length;j++){
            await knex('estimation_item').where('id',past_item_data[j].id).del().then(response=>{
                status = 200;
                message = 'Estimation has been updated successfully!'
            }).catch(err=>console.log(err))
        }
    }

    return res.json({ status, message })
}

// this below function is used to delete estimation
router.delete = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;

    await knex('estimation_start').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'Estimation has been deleted successfully!'
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used for filter the report
router.filterReport = async (req,res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let inputs = req.body;
    let current_vehicle = JSON.parse(inputs.current_vehcile);
    let current_company = JSON.parse(inputs.current_company);
    let sales_data = [];

    let query = `SELECT * FROM estimation_start WHERE estimation_start.estimation_date BETWEEN '${inputs.fromDate}' AND '${inputs.toDate}'`

    if (current_vehicle){
        query = query + ` AND estimation_start.vehicle_id='${current_vehicle.value}' `
    }

    if (current_company){
        query = query + ` AND estimation_start.company_id='${current_company.value}' `
    }

    query = query + ` ORDER BY estimation_start.id DESC`
    

    
    await knex.raw(query).then(async response => {
        if (response[0]) {
            sales_data = response[0];
            status = 200;
            message = 'Sales data has been fetched successfully!';
            for (let i=0;i<sales_data.length;i++){
                await knex('estimation_item').where('estimation_start_id',sales_data[i].id).then(response1=>{
                    sales_data[i]['items'] = response1;
                })
            }
        }
    }).catch(err => console.log(err))

    console.log(sales_data)

    return res.json({status, message, sales_data })

}

module.exports = router