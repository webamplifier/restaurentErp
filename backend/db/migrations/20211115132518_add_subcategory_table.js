
exports.up = function(knex) {
    return knex.schema.createTable("subcategories",function(table){
        table.bigIncrements("id");
        table.uuid("uuid");
        table.string("name");
        table.string("category_id");
        table.string("category_name");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("subcategories")
  };
  