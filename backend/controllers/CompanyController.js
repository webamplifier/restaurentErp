const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of the clients
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let client_list = [];
    let all_bikes = HELPERS.bike_type;

    await knex('companies').then(response=>{
        if (response){
            status = 200;
            message = 'Client list has been fetched successfully!';
            client_list = response;
            console.log(response)
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,client_list,all_bikes});

}

// this below function is used to create the client
router.create = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid : await HELPERS.getKnexUuid(knex),
        name : inputs.name,
        email : inputs.email,
        mobile : inputs.mobile,
        address : inputs.address,
        created_by : 1,
        created_at : await HELPERS.dateTime()
    }

    await knex('companies').insert(create_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Client has been created successfully!'
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
} 

// this below function is used to get the detail of client
router.fetchById = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let client_detail = {};

    await knex('companies').where('id',id).then(response=>{
        if (response.length > 0){
            status = 200;
            message = 'Client detail has been fetched successfully!';
            client_detail = response[0];
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,client_detail})

}

// this below function is used to update the client detail
router.update = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    let update_obj = {
        name : inputs.name,
        company_name : inputs.company_name,
        email : inputs.email,
        mobile : inputs.mobile,
        address : inputs.address,
        updated_by : 1,
        updated_at : await HELPERS.dateTime()
    }

    await knex('companies').where('id',id).update(update_obj).then(response=>{
        if (response){
            status = 200;
            message = 'Client has been updated successfully!'
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below function is used to delete the client
router.delete = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;

    await knex('companies').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'Client has been deleted successfully!'
        }
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// this below route is used to adjust amount
router.adjustAmount = async (req,res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let {id} = req.params;
    let inputs = req.body;

    let company_data = {};

    await knex('companies').where('id',id).then(response=>{
        if (response.length > 0){
            company_data = response[0];
        }
    }).catch(err=>console.log(err))

    await knex('companies').where('id',id).update({
        'due_amount' : parseInt(company_data.due_amount) + parseInt(inputs.value)
    }).then(res=>{
        status = 200;
        message = "Amount adjust successfully!"
    }).catch(err=>console.log(err))

    return res.json({status,message})
}

// get profit by company controller
router.getCompanySalesReport = async (req,res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let inputs = req.body;
    let company_dict = {};

    console.log(inputs)

    await knex("companies").then(response=>{
        if (response.length > 0){
            for (let i=0;i<response.length;i++){
                company_dict[response[i].name] = 0
            }
        }
    }).catch(err=>console.log(err))

    let query = `SELECT * FROM estimation_start WHERE estimation_start.estimation_date BETWEEN '${inputs.fromDate}' AND '${inputs.toDate}' ORDER BY estimation_start.id DESC`

    await knex.raw(query).then(response=>{
        if (response[0]){
            let result = response[0];

            for (let i=0;i<result.length;i++){
                company_dict[result[i].company_name] = parseFloat(company_dict[result[i].company_name]) + parseFloat(result[i].total_after_roundoff)
            }
            status = 200;
            message = "Amount fetched successfully!"
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,company_dict})
}

module.exports = router;