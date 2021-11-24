const express = require("express");
const HELPERS = require("../Helpers/helpers")
const MD5 = require("md5")

const router = express.Router();

// this below function is used to get the list of restaurants
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let restaurant_list = [];

    if (req.user_data.role == 1){
        await knex("restaurents").then(response=>{
            if (response){
                status = 200;
                message = 'Restaurant list has been fetched successfully!';
                restaurant_list = response;
            }
        }).catch(err=>console.log(err))
    }else{
        status = 300;
        message = "You are not authorized to perform this action"
    }

    return res.json({status,message,restaurant_list})
}


// this below function is used to fetch the restaurant by id
router.fetchById = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let restaurant_detail = {};

    await knex('restaurents').where('id',id).then(response=>{
        if (response.length > 0){
            status = 200;
            message = 'Restaurant has been fetched successfully!';
            restaurant_detail = response[0];
        }
    }).catch(err=>console.log(err));

    return res.json({status,message,restaurant_detail});
}

// this below function is used to create the restaurents
router.create = async (req, res) => {
    let status = 500;
    let message = "Oops something went wrong!";
    let inputs = req.body;


    await knex("restaurents").where("email", inputs.email).then(async response => {
        if (response.length > 0) {
            status = 300;
            message = "Email already exists"
        } else {
            let create_obj = {
                uuid: await HELPERS.getKnexUuid(knex),
                name: inputs.name,
                email: inputs.email,
                mobile: inputs.mobile,
                food_license_number: inputs.food_license_number,
                gst_number: inputs.GST,
                address: inputs.address,
                expiry_date : inputs.expiry_date,
                reminder_date : inputs.reminder_date
            }

            await knex("restaurents").insert(create_obj).then(response => {
                if (response) {
                    status = 200;
                    message = "Restaurent has been created sucessfully!"
                }
            }).catch(err => console.log(err))
        }
    })


    return res.json({ status, message })
}

// this below function is used to update the category
router.update = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let {id} = req.params;
    let inputs = req.body;

    await knex("restaurents").where("id", id).then(async response => {
        if (response[0].email === inputs.email) {
             let update_obj = {
                name: inputs.name,
                email: inputs.email,
                mobile: inputs.mobile,
                food_license_number: inputs.food_license_number,
                gst_number: inputs.GST,
                address: inputs.address,
                expiry_date : inputs.expiry_date,
                reminder_date : inputs.reminder_date
                     }

                await knex('restaurents').where('id',id).update(update_obj).then(response1=>{
                if (response1){
                    status = 200;
                    message = 'Restaurant has been updated successfully!';
                    }
                }).catch(err=>console.log(err))
            }
        else{
            await knex("restaurents").where("email", inputs.email).then(async response1 => {
                if (response1.length > 0) {
                    status = 300;
                    message = "Email already exists"
                } else {
                    let update_obj = {
                        name: inputs.name,
                        email: inputs.email,
                        mobile: inputs.mobile,
                        food_license_number: inputs.food_license_number,
                        gst_number: inputs.GST,
                        address: inputs.address,
                        expiry_date : inputs.expiry_date,
                        reminder_date : inputs.reminder_date
                    }
        
                    await knex("restaurents").where("id",id).update(update_obj).then(response2 => {
                        if (response2) {
                            status = 200;
                            message = "Restaurent has been updated sucessfully!"
                        }
                    }).catch(err => console.log(err))
                }
            })
        }
        })

    return res.json({status,message})
}

module.exports = router;