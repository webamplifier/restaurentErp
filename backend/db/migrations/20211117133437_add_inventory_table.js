
exports.up = function(knex) {
    return knex.schema.createTable("inventories",function(table){
        table.bigIncrements("id");
        table.uuid("uuid");
        table.string("product_id")
        table.string("product_name")
        table.string("total_qty")
        table.string("adjust_qty")
        table.string("purchase_qty");
        table.string("purchasereturn_qty");
        table.string("sales_qty");
        table.string("salesreturn_qty");
        table.string("mrp");
        table.string("purchase_price");
        table.string("party_id");
        table.string("party_name");
        table.string("purchaseitem_id");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("inventories")
  };
  