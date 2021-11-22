
exports.up = function(knex) {
  return knex.schema.createTable("products",function(table){
      table.bigIncrements("id");
      table.uuid('uuid');
      table.string("category_id")
      table.string("category_name")
      table.string("subcategory_id")
      table.string("subcategory_name")
      table.string("name")
      table.string("price")
      table.string("pack_unit")
      table.string("sales_unit")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("products")
};
