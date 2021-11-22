
exports.up = function(knex) {
  return knex.schema.createTable("reciepts",function(table){
      table.bigIncrements("id");
      table.uuid("uuid");
      table.integer("condition").defaultTo(1).comment("1 for incoming and 2 for outgoing");
      table.integer("type").defaultTo(1).comment("1 for purchase");
      table.bigInteger("reference_id")
      table.string("amount");
      table.string("date")
      table.string("payment_type")
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reciepts")
};
