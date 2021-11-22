
exports.up = function(knex) {
  return knex.schema.createTable("categories",function(table){
      table.bigIncrements("id");
      table.uuid("uuid");
      table.string("name");
      table.string("code")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("categories")
};
