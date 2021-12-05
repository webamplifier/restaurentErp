const express = require('express');
const router = express.Router();
const HELPERS = require('../Helpers/helpers');

// this below function is used to get the list of expenses
router.list = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let expense_list = [];

    await knex('expenses').where('restaurent_id', req.user_data.restaurent_id).orderBy("id", "desc").then(response => {
        if (response) {
            status = 200;
            message = 'Expense list has been fetched successfully!';
            expense_list = response;
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, expense_list })
}

// this below function is used to create the expense
router.create = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid: await HELPERS.getKnexUuid(knex),
        paid_amount: inputs.paid_amount,
        name: inputs.name,
        expense_date: inputs.expense_date ? inputs.expense_date : HELPERS.dateTime(),
        item_name: inputs.item,
        item_description : inputs.item_description,
        remarks: inputs.remarks,
        created_by: req.user_data.id,
        created_by_name: req.user_data.name,
        created_at: HELPERS.dateTime(),
        restaurent_id: req.user_data.restaurent_id
    }

    await knex('expenses').insert(create_obj).then(response => {
        if (response) {
            status = 200;
            message = 'Expense has been created successfully!';
        }
    }).catch(err => console.log(err))

    return res.json({ status, message })
}

// this below function is used to fetch the expense by id
router.fetchById = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    let expense_detail = {};
    
    if (req.user_data.role == 2 || req.user_data.role == 1) {
    await knex('expenses').where('id', id).where("restaurent_id", req.user_data.restaurent_id).then(response => {
        if (response.length > 0) {
            status = 200;
            message = 'Expense has been fetched successfully!';
            expense_detail = response[0];
        }
    }).catch(err => console.log(err));
    }
    else{
        status = 300;
        message = "You are not authorized to perform this action";
    }
    return res.json({ status, message, expense_detail });
}

// this below function is used to update the expense
router.update = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    let inputs = req.body;
    
    if (req.user_data.role == 2 || req.user_data.role == 1) {
    let update_obj = {
        paid_amount: inputs.paid_amount,
        name: inputs.name,
        expense_date: inputs.expense_date ? inputs.expense_date : HELPERS.dateTime(),
        item_name: inputs.item,
        item_description : inputs.item_description,
        remarks: inputs.remarks,
    }

    await knex('expenses').where('id', id).where("restaurent_id", req.user_data.restaurent_id).update(update_obj).then(response => {
        if (response) {
            status = 200;
            message = 'Expense has been updated successfully!';
        }
    }).catch(err => console.log(err))
    }
    else{
        status = 300;
        message = "You are not authorized to perform this action";
    }
    return res.json({ status, message })
}

// this below function is used to delete the expense
router.delete = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    
    if (req.user_data.role == 2 || req.user_data.role == 1) {
    await knex('expenses').where('id', id).where("restaurent_id", req.user_data.restaurent_id).del().then(response => {
        if (response) {
            status = 200;
            message = 'Expense has been deleted successfully!';
        }
    }).catch(err => console.log(err))
   }
   else{
    status = 300;
    message = "You are not authorized to perform this action";
   }

    return res.json({ status, message })
}

module.exports = router;