require('dotenv').config();
const moment = require('moment-timezone');

function getKnexUuid(knex) {
    return new Promise(function (resolve, reject) {
        knex.raw("SELECT uuid() AS uuid").then((response) => {
            resolve(response[0][0]["uuid"]);
        });
    });
}

function dateTime(){
    return moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD HH:mm:ss');
}

function formatDate(date_sting) {
    const date_array = date_sting.split('-');
    return `${date_array[2]}-${date_array[1]}-${date_array[0]}`
}

function current_date(){
    return moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD')
}


const tax_arr = [
    {value : 0,label : '0%'},
    {value : 8,label : '8%'},
    {value : 12,label : '12%'},
    {value : 18,label : '18%'},
]


module.exports = {
    getKnexUuid,
    formatDate,
    dateTime,
    current_date,
    tax_arr
}