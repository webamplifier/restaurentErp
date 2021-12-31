const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of products
router.list = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let product_list = [];
    let tax_list = HELPERS.tax_arr

    await knex('products').where('restaurent_id', req.user_data.restaurent_id).orderBy("id", "desc").then(response => {
        if (response) {
            status = 200;
            message = 'Product list has been fetched successfully!';
            product_list = response;
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, product_list, tax_list })
}

// this below function is used to create the products
router.create = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid: await HELPERS.getKnexUuid(knex),
        price: inputs.price,
        name: inputs.product_name,
        stock_quantity: inputs.stock_quantity,
        created_by: req.user_data.id,
        created_by_name: req.user_data.name,
        created_at: HELPERS.dateTime(),
        restaurent_id: req.user_data.restaurent_id
    }

    await knex('products').where('name', inputs.product_name).where("restaurent_id", req.user_data.restaurent_id).then(async response => {
        if (response.length > 0) {
            status = 400;
            message = 'Product with this name already exist'
        } else {
            await knex('products').where('restaurent_id', req.user_data.restaurent_id).insert(create_obj).then(response => {
                if (response) {
                    status = 200;
                    message = 'Product has been created successfully!';
                }
            }).catch(err => console.log(err))
        }
    }).catch(err => console.log(err));

    return res.json({ status, message })
}

// this below function is used to fetch the product by id
router.fetchById = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    let product_detail = {};

    await knex('products').where('id', id).where("restaurent_id", req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            status = 200;
            message = 'Product has been fetched successfully!';
            product_detail = response[0];
        }
    }).catch(err => console.log(err));

    return res.json({ status, message, product_detail });
}

// this below function is used to update the product
router.update = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    let inputs = req.body;

    let update_obj = {
        price: inputs.price,
        name: inputs.product_name,
        stock_quantity: inputs.stock_quantity,
    }

    await knex('products').where('id', id).where("restaurent_id", req.user_data.restaurent_id).update(update_obj).then(response => {
        if (response) {
            status = 200;
            message = 'Product has been updated successfully!';
        }
    }).catch(err => console.log(err))

    return res.json({ status, message })
}

// this below function is used to delete the product
router.delete = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    
    await knex('products').where('id', id).where("restaurent_id", req.user_data.restaurent_id).del().then(response => {
        if (response) {
            status = 200;
            message = 'Product has been deleted successfully!';
        }
    }).catch(err => console.log(err))

    return res.json({ status, message })
}

router.fetchProductList = async(req,res)=>{
    let status = 500;
    let message = 'Oops something went wrong!';
    let list = [];

    let default_query = "select * from products";
    let sort = "";
    let total_records = "";
    let offset = 0

    let count_query = "select COUNT(*) as total from products";
    
    if (req.query.sort_order) {
        sort = JSON.parse(req.query.sort_order);
    }

    let filter_query = ` where products.restaurent_id='${req.user_data.restaurent_id}'`;

    if(req.query.filter_value){
        filter_query += ` and (products.name LIKE '%${req.query.filter_value}%' or products.price LIKE '%${req.query.filter_value}%' or products.stock_quantity LIKE '%${req.query.filter_value}%')`
    }
    
    let order_by_query = " order by products.id desc LIMIT 10 offset 0";

    if (req.query.page_number && req.query.page_size) {
        offset = (req.query.page_number - 1) * (req.query.page_size);
        order_by_query = ` order by products.id desc LIMIT ${req.query.page_size} offset ${offset}`;
        if (sort) {
            order_by_query = ` order by products.${sort.column} ${sort.order} LIMIT ${req.query.page_size} offset ${offset}`;
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
            message = "Product List has been fetched successfully";
        }
    }).catch((err) => console.log(err));

    return res.json({status, message, list, total_records})
}

module.exports = router;
