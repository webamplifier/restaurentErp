const express = require("express");
const router = express.Router();
const HELPERS = require("../Helpers/helpers")

// this below function is used to grab the profit amount
router.getProfitAmountReport = async (req, res) => {
    let status = 200;
    let message = 'Oops something went wrong!';
    let current_date = HELPERS.current_date();

    let sales_record = 0;
    let expense_record = 0;
    let cash_record = 0;
    let bank_record = 0;

    await knex('sale_start').where('restaurent_id', req.user_data.restaurent_id).where('sale_date', current_date).where("status", 1).then(response => {
        if (response) {
            status = 200;
            message = 'sales record has been fetched successfully!';

            for (let i = 0; i < response.length; i++) {
                if (response[i].payment_type == "cash") {
                    cash_record = parseFloat(cash_record) + parseFloat(response[i].total_after_roundoff);
                }
                if (response[i].payment_type == "bank") {
                    bank_record = parseFloat(bank_record) + parseFloat(response[i].total_after_roundoff);
                }
                sales_record = parseFloat(sales_record) + parseFloat(response[i].total_after_roundoff)
            }
        }
    }).catch(err => console.log(err))

    await knex('expenses').where('restaurent_id', req.user_data.restaurent_id).where('expense_date', current_date).then(response => {
        if (response) {
            status = 200;
            message = 'expense record has been fetched successfully!';

            for (let i = 0; i < response.length; i++) {
                expense_record = parseFloat(expense_record) + parseFloat(response[i].paid_amount)
            }
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, sales_record, expense_record, cash_record, bank_record })
}

// this below function is used to filter the data by date
router.filterDateProfit = async (req, res) => {
    let status = 200;
    let message = 'Oops something went wrong!';
    let inputs = req.body;

    let sales_record = 0;
    let expense_record = 0;
    let cash_record = 0;
    let bank_record = 0;

    let date_from = HELPERS.formatDate(inputs.from);
    let date_to = HELPERS.formatDate(inputs.to);

    let sales_query = `select * from sale_start where sale_start.status=1 and sale_start.restaurent_id='${req.user_data.restaurent_id}' and ((sale_start.sale_date BETWEEN '${inputs.from}' AND '${inputs.to}') or (sale_start.sale_date BETWEEN '${date_from}' AND '${date_to}'))`
    let expense_query = `select * from expenses where expenses.restaurent_id='${req.user_data.restaurent_id}' and ((expenses.expense_date BETWEEN '${inputs.from}' AND '${inputs.to}') or (expenses.expense_date BETWEEN '${date_from}' AND '${date_to}'))`

    await knex.raw(sales_query).then(response => {
        if (response[0]) {
            status = 200;
            message = 'sales record has been fetched successfully!';

            for (let i = 0; i < response[0].length; i++) {
                if (response[0][i].payment_type == "cash") {
                    cash_record = parseFloat(cash_record) + parseFloat(response[0][i].total_after_roundoff);
                }
                if (response[0][i].payment_type == "bank") {
                    bank_record = parseFloat(bank_record) + parseFloat(response[0][i].total_after_roundoff);
                }
                sales_record = parseFloat(sales_record) + parseFloat(response[0][i].total_after_roundoff)
            }
        }
    }).catch(err => console.log(err))

    await knex.raw(expense_query).then(response => {
        if (response[0]) {
            status = 200;
            message = 'expense record has been fetched successfully!';

            for (let i = 0; i < response[0].length; i++) {
                expense_record = parseFloat(expense_record) + parseFloat(response[0][i].paid_amount)
            }
        }
    }).catch(err => console.log(err))

    return res.json({ status, message, sales_record, expense_record, cash_record, bank_record })
}

module.exports = router;
