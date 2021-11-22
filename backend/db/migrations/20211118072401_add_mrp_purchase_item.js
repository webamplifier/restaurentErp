
exports.up = function(knex) {
  return knex.schema.table("purchase_items",function(table){
      table.string("mrp")
  })
};

exports.down = function(knex) {
  
};
