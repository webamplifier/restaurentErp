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

function current_date(){
    return moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD')
}

function fetchParentPermission(knex) {
    return new Promise(async function (resolve, reject) {
        await knex('Parent_Permission').then(response => {
            if (response.length > 0) {
                resolve(response)
            }
        }).catch(err => reject(err))
    })

}

const bike_type = ["Honda Unicorn 160 cc","Bajaj Boxer BM150","TVS Apache RTR 180","TVS Stryker 125 cc","Hero Hunk 150 cc","Bajaj Pulsar 150 cc"];
const service_location = ["khetan","salmiya"]

module.exports = {
    getKnexUuid,
    dateTime,
    fetchParentPermission,
    current_date,
    bike_type,
    service_location
}