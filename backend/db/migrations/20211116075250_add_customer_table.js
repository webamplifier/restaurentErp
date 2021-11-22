
exports.up = function(knex) {
    return knex.schema.createTable("customers",function(table){
        table.bigIncrements("id");
        table.uuid("uuid");
        table.string("name")
        table.string("email")
        table.string("mobile")
        table.string("tax")
        table.string("address")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("customers")
  };
  