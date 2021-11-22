const express = require('express');
const router = express.Router();

// this below function is used to get the list of categories
router.list = async (req,res) => {
    let status = 500;
    let message = 'Oops something went wrong!';
    let reciept_list = [];

    await knex('reciepts').then(response=>{
        if (response)
        {
            status = 200;
            message = 'Reciept list has been fetched successfully!';
            reciept_list = response;
        }
    }).catch(err=>console.log(err))

    return res.json({status,message,reciept_list})
}

module.exports= router;