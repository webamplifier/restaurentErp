const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of categories
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let subcategory_list = [];

    await knex('subcategories').orderBy("id","desc").then(response=>{
        if (response){
            status = 200;
            message = 'Sub Categories list has been fetched successfully!';
            subcategory_list = response;
        }
    }).catch(err=>console.log(err))
    return res.json({status,message,subcategory_list})
}

// this below function is used to create the category
router.create = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;



    let create_obj = {
        uuid : await HELPERS.getKnexUuid(knex),
        name : inputs.name,
        category_id : JSON.parse(inputs.category).value,
        category_name : JSON.parse(inputs.category).label,
    }

    await knex('subcategories').insert(create_obj).then(response=>{
        if (response){
            status = 200;
            message = 'sub Category has been created successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to fetch the category by id
router.fetchById = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let subcategory_detail = {};

    await knex('subcategories').where('id',id).then(response=>{
        if (response.length > 0){
            status = 200;
            message = 'Category has been fetched successfully!';
            subcategory_detail = response[0];
        }
    }).catch(err=>console.log(err));

    return res.json({status,message,subcategory_detail});
}

// this below function is used to update the category
router.update = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    let update_obj = {
        name : inputs.name,
        category_id : JSON.parse(inputs.category).value,
        category_name : JSON.parse(inputs.category).label,
        code : inputs.code,
    }

    await knex('subcategories').where('id',id).update(update_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Sub Category has been updated successfully!';
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

    

    await knex('subcategories').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'Category has been deleted successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

module.exports = router;