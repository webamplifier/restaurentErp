
exports.up = function(knex) {
    return knex.schema.createTable("sale_start",function(table){
        table.bigIncrements("id");
        table.uuid("uuid");
        table.string("restaurent_id")
        table.string("invoice_number");
        table.string("sale_date");
        table.string("customer_name");
        table.string("total_supply");
        table.string("item_discount_percentage");
        table.string("item_discount_amount");
        table.string("bill_discount_percentage");
        table.string("bill_discount_amount");
        table.string("total_before_roundoff");
        table.string("total_after_roundoff");
        table.string("roundoff");
        table.string("discount_type");
        table.string("taxable_amount");
        table.string("remarks");
        table.string("amount_paid");
        table.string("payment_type");
        table.string("remain_amount");
        table.string("remain_amount_date");
        table.bigInteger("created_by");
        table.string("created_by_name");
        table.datetime("created_at");
        table.integer("status").defaultTo(1).comment("1 for unpaid and 2 for paid")
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable("sale_start")
};
