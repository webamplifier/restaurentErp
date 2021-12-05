
exports.up = function(knex) {
    return knex.schema.createTable("products",function(table){
        table.bigIncrements("id");
        table.uuid("uuid");
        table.string("name")
        table.string("price")
        table.bigInteger("stock_quantity").defaultTo(0)
        table.bigInteger("restaurent_id")
        table.bigInteger("created_by")
        table.string("created_by_name")
        table.datetime("created_at")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("products")
  };
  