const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of products
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let product_list = [];
    let tax_list = HELPERS.tax_arr

    await knex('products').where('restaurent_id',req.user_data.restaurent_id).orderBy("id","desc").then(response=>{
        if (response){
            status = 200;
            message = 'Product list has been fetched successfully!';
            product_list = response;
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,product_list,tax_list})
}

// this below function is used to create the products
router.create = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid : await HELPERS.getKnexUuid(knex),
        price : inputs.price,
        name : inputs.product_name,
        stock_quantity: inputs.stock_quantity,
        created_by: req.user_data.id,
        created_by_name: req.user_data.name,
        created_at: HELPERS.dateTime(),
        restaurent_id : req.user_data.restaurent_id
    }

    await knex('products').insert(create_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Product has been created successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to fetch the product by id
router.fetchById = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let product_detail = {};

    await knex('products').where('id',id).then(response=>{
        if (response.length > 0){
            status = 200;
            message = 'Product has been fetched successfully!';
            product_detail = response[0];
        }
    }).catch(err=>console.log(err));

    return res.json({status,message,product_detail});
}

// this below function is used to update the product
router.update = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    console.log(inputs);

    let update_obj = {
        price : inputs.price,
        name : inputs.product_name,
        stock_quantity: inputs.stock_quantity,
        created_by: req.user_data.id,
        created_by_name: req.user_data.name,
        created_at: HELPERS.dateTime()
    }

    await knex('products').where('id',id).update(update_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Product has been updated successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to delete the product
router.delete = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    await knex('products').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'Product has been deleted successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

module.exports = router;