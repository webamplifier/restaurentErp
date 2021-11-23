const express = require('express');
const router = express.Router();
const MD5 = require('md5');
const jwt = require('jsonwebtoken');
const HELPERS = require('../Helpers/helpers');

// this below route is used for login
router.login = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;
    let user_data = {};

    await knex('users').where('email', inputs.email).where('password', MD5(inputs.password)).then(response => {
        if (response.length > 0) {
            status = 200;
            message = 'User has been logged in successfully!';
            user_data = response[0];
            user_data['token'] = jwt.sign({ user_data }, 'secret_electric_erp')
        } else {
            status = 403;
            message = 'Incorrect email and password!'
        }
    }).catch(err => console.log(err));

    return res.json({ status, message, user_data })
}


// this below function is used to get the list of users
router.list = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let users_list = [];

    await knex('users').where('role', '!=', 1).then(response => {
        if (response) {
            status = 200;
            message = 'users list has been fetched successfully!';
            users_list = response;
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, users_list })
}

// this below function is used to create the users
router.create = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let create_obj = {
        uuid: await HELPERS.getKnexUuid(knex),
        name: inputs.name,
        email: inputs.email,
        password: MD5(inputs.password),
        restaurent_id : inputs.restaurent_id,
        restaurant_name: inputs.restaurant_name,
        role: inputs.role,
        created_by: req.user_data.id,
        created_by_name: req.user_data.name,
        created_at: await HELPERS.dateTime()
    }

    await knex('users').where('email', inputs.email).then(async response => {
        if (response.length > 0) {
            status = 400;
            message = 'User with this email already exist'
        } else {
            await knex('users').insert(create_obj).then(response => {
                if (response) {
                    status = 200;
                    message = 'user has been created successfully!';
                }
            }).catch(err => console.log(err))
        }
    })

    return res.json({ status, message })
}

// this below function is used to fetch the category by id
router.fetchById = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    let user_detail = {};

    await knex('users').where('id', id).then(response => {
        if (response.length > 0) {
            status = 200;
            message = 'user has been fetched successfully!';
            user_detail = response[0];
        }
    }).catch(err => console.log(err));

    return res.json({ status, message, user_detail });
}

// this below function is used to update the category
router.update = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;
    let inputs = req.body;

    await knex("users").where("id", id).then(async response => {
        if (response[0].email === inputs.email) {
          let update_obj = {};
           if (inputs.password) {
           update_obj = {
                    name: inputs.name,
                    email: inputs.email,
                    password: MD5(inputs.password),
                    role: inputs.role,
                    restaurent_id : inputs.restaurent_id,
                    restaurant_name: inputs.restaurant_name,
                    created_by: req.user_data.id,
                    created_by_name: req.user_data.name,
                    created_at: await HELPERS.dateTime()
                         }
                } else {
                    update_obj = {
                            name: inputs.name,
                            email: inputs.email,
                            role: inputs.role,
                            restaurent_id : inputs.restaurent_id,
                            restaurant_name: inputs.restaurant_name,
                            created_by: req.user_data.id,
                            created_by_name: req.user_data.name,
                            created_at: await HELPERS.dateTime()
                            }
             }

    await knex('users').where('id', id).update(update_obj).then(response1 => {
        if (response1) {
            status = 200;
            message = 'User has been updated successfully!';
        }
    }).catch(err => console.log(err))
    }else{
        await knex("users").where("email", inputs.email).then(async response1 => {
            if (response1.length > 0) {
                status = 300;
                message = "Email already exists"
            } else {
                let update_obj = {};
           if (inputs.password) {
           update_obj = {
                    name: inputs.name,
                    email: inputs.email,
                    password: MD5(inputs.password),
                    role: inputs.role,
                    restaurent_id : inputs.restaurent_id,
                    restaurant_name: inputs.restaurant_name,
                    created_by: req.user_data.id,
                    created_by_name: req.user_data.name,
                    created_at: await HELPERS.dateTime()
                         }
            } else {
            update_obj = {
                    name: inputs.name,
                    email: inputs.email,
                    role: inputs.role,
                    restaurent_id : inputs.restaurent_id,
                    restaurant_name: inputs.restaurant_name,
                    created_by: req.user_data.id,
                    created_by_name: req.user_data.name,
                    created_at: await HELPERS.dateTime()
                     }
         }
         await knex("users").where("id",id).update(update_obj).then(response2 => {
            if (response2) {
                status = 200;
                message = "User has been updated sucessfully!"
            }
        }).catch(err => console.log(err))
    }
})
}
})
    return res.json({ status, message })
}

// this below function is used to delete the category
router.delete = async (req, res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let { id } = req.params;

    await knex('users').where('id',id).del().then(response=>{
        if (response){
            status = 200;
            message = 'User has been deleted successfully!';
        }
    }).catch(err=>console.log(err))
    
    return res.json({ status, message })
}

module.exports = router;
