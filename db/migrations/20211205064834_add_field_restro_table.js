
exports.up = function(knex) {
  return knex.schema.table("restaurents",function(table){
      table.string("First_amount")
      table.string("renew_amount")
  })
};

exports.down = function(knex) {
  
};
