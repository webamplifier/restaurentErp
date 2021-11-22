
exports.up = function(knex) {
    return knex.schema.createTable("users",function(table){
      table.bigIncrements('id');
      table.uuid("uuid");
      table.string("name")
      table.string("email")
      table.string("password")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("user")
  };
  