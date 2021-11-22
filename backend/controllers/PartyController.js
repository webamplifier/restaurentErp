const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of categories
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let party_list = [];

    await knex('parties').then(response=>{
        if (response){
            status = 200;
            message = 'Party list has been fetched successfully!';
            party_list = response;
        }
    }).catch(err=>console.log(err))
    return res.json({status,message,party_list})
}

// this below function is used to create the category
router.create = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid : await HELPERS.getKnexUuid(knex),
        name : inputs.name,
        email : inputs.email,
        mobile : inputs.mobile,
        tax : inputs.tax_number,
        address : inputs.address,
    }

    await knex('parties').insert(create_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Party has been created successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to fetch the category by id
router.fetchById = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let party_detail = {};

    await knex('parties').where('id',id).then(response=>{
        if (response.length > 0){
            status = 200;
            message = 'Category has been fetched successfully!';
            party_detail = response[0];
        }
    }).catch(err=>console.log(err));

    return res.json({status,message,party_detail});
}

// this below function is used to update the category
router.update = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    let update_obj = {
        name : inputs.name,
        email : inputs.email,
        mobile : inputs.mobile,
        tax : inputs.tax_number,
        address : inputs.address,
    }

    await knex('parties').where('id',id).update(update_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Party has been updated successfully!';
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

    

    await knex('parties').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'Party has been deleted successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

module.exports = router;