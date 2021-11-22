const express = require('express');
const HELPERS = require('../Helpers/helpers');

const router = express.Router();

// this below function is used to get the detail of vehicles
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let vehicle_list = [];

    await knex('vehicles').orderBy("id","desc").then(response=>{
        if (response){
            status = 200;
            message = 'vehciles has been fetched successfully!';
            vehicle_list = response;
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,vehicle_list});
}

// this below function is used to create the vehciles
router.create = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid : await HELPERS.getKnexUuid(knex),
        company_id : inputs.company_id,
        company_name : inputs.company_name,
        vehicle_number : inputs.vehicle_number,
        bike_type : inputs.bike_type,
        created_by : 1,
        created_at : await HELPERS.dateTime() 
    };

    await knex('vehicles').insert(create_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Vehicle has been created successfully!'
        }
    }).catch(err=> console.log(err));

    return res.json({status,message});
}

// this below function is used to get the detail of vehicle by id

router.fetchById = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let vehicle_detail = {};

    await knex('vehicles').where('id',id).then(response=>{
        if (response.length > 0){
            status = 200;
            message = 'Vehicle ha been fetched successfully!';
            vehicle_detail = response[0];
        }
    }).catch(err=>console.log(err));

    return res.json({status,message,vehicle_detail})
}

// this below function is used to update the vehicle
router.update = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    let update_obj = {
        company_id : inputs.company_id,
        company_name : inputs.company_name,
        vehicle_number : inputs.vehicle_number,
        bike_type : inputs.bike_type,
        updated_by : 1,
        updated_at : await HELPERS.dateTime() 
    }

    await knex('vehicles').where('id',id).update(update_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Vehicle has been updated successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to delete the vehicle
router.delete = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;

    await knex('vehicles').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'vehicle has been deleted successfully!';
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

module.exports = router;