
exports.up = function(knex) {
  return knex.schema.createTable("purchase_items",function(table){
      table.bigIncrements("id");
      table.uuid("uuid");
      table.string("purchase_start_id");
      table.string("product_id")
      table.string("product_name")
      table.string("description")
      table.string("purchase_price")
      table.string("qty");
      table.string("free_qty");
      table.string("amount_before_tax");
      table.string("tax_percent");
      table.string("amount_after_tax");
      table.string("tax_amount");
      table.string("amount_before_discount");
      table.string("discount_percent");
      table.string("amount_after_discount");
      table.string("discount_amount");
      table.string("total");

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("purchase_items")
};
