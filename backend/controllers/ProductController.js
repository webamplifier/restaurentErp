const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of products
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let product_list = [];

    await knex('products').orderBy("id","desc").then(response=>{
        if (response){
            status = 200;
            message = 'Product list has been fetched successfully!';
            product_list = response;
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,product_list})
}

// this below function is used to create the products
router.create = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid : await HELPERS.getKnexUuid(knex),
        category_id : inputs.category_id,
        category_name : inputs.category_name,
        subcategory_id : inputs.subcategory_id,
        subcategory_name : inputs.subcategory_name,
        type : inputs.type,
        price : inputs.price,
        name : inputs.product_name,
        pack_unit : inputs.pack,
        sales_unit : inputs.sales,
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
        category_id : inputs.category_id,
        category_name : inputs.category_name,
        subcategory_id : inputs.subcategory_id,
        subcategory_name : inputs.subcategory_name,
        type : inputs.type,
        price : inputs.price,
        name : inputs.product_name,
        pack_unit : inputs.pack,
        sales_unit : inputs.sales,
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