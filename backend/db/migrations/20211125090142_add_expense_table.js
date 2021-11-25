
exports.up = function(knex) {
    return knex.schema.createTable("expenses",function(table){
        table.bigIncrements("id");
        table.uuid("uuid");
        table.string("expense_date");
        table.string("name");
        table.string("item_name");
        table.string("item_description");
        table.string("paid_amount");
        table.string("remarks");
        table.bigInteger("restaurent_id")
        table.bigInteger("created_by")
        table.string("created_by_name")
        table.datetime("created_at")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("expenses");  
};
