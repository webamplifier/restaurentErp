const express = require("express");
const HELPERS = require("../Helpers/helpers")
const MD5 = require("md5")

const router = express.Router();

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
                // expiry_date : inputs.expiry_date,
                // reminder_date : inputs.reminder_date
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

module.exports = router;