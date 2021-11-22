const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of categories
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let category_list = [];

    await knex('categories').then(response=>{
        if (response){
            status = 200;
            message = 'Categories list has been fetched successfully!';
            category_list = response;
        }
    }).catch(err=>console.log(err))
    return res.json({status,message,category_list})
}

// this below function is used to create the category
router.create = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid : await HELPERS.getKnexUuid(knex),
        name : inputs.name,
        code : inputs.code,
    }

    await knex('categories').insert(create_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Category has been created successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to fetch the category by id
router.fetchById = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let category_detail = {};

    await knex('categories').where('id',id).then(response=>{
        if (response.length > 0){
            status = 200;
            message = 'Category has been fetched successfully!';
            category_detail = response[0];
        }
    }).catch(err=>console.log(err));

    return res.json({status,message,category_detail});
}

// this below function is used to update the category
router.update = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    let update_obj = {
        name : inputs.name,
        code : inputs.code,
    }

    await knex('categories').where('id',id).update(update_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Category has been updated successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to delete the category
router.delete = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    

    await knex('categories').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'Category has been deleted successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

module.exports = router;