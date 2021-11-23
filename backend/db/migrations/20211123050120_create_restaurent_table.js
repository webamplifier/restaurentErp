
exports.up = function(knex) {
  return knex.schema.createTable("restaurents",function(table){
      table.bigIncrements("id");
      table.uuid("uuid");
      table.string("name")
      table.string("email")
      table.string("mobile")
      table.string("food_license_number")
      table.string("gst_number")
      table.text("address")
      table.string("expiry_date")
      table.string("reminder_date")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("restaurents")
};
