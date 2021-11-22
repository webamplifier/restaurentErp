
exports.up = function(knex) {
  return knex.schema.table("products",function(table){
      table.string("type").defaultTo("product")
  })
};

exports.down = function(knex) {
  
};
