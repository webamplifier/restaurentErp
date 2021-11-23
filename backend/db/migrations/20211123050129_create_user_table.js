
exports.up = function(knex) {
    return knex.schema.createTable("users",function(table){
        table.bigIncrements("id");
        table.uuid("uuid");
        table.string("name")
        table.string("email")
        table.string("password")
        table.bigInteger("restaurent_id")
        table.integer("role")
        table.bigInteger("created_by")
        table.string("created_by_name")
        table.datetime("created_at")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("users")
  };
  