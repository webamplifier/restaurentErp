const express = require('express');
const router = express.Router();

// this below function is used to get the list of categories
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let inventory_list = [];

    await knex('inventories').then(response=>{
        if (response){
            status = 200;
            message = 'Inventory list has been fetched successfully!';
            inventory_list = response;
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,inventory_list})
}

module.exports= router;