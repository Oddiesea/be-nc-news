exports.up = function(connection) {
    return connection.schema.createTable("topics", topics => {
        console.log("creating topics table");
      topics.string("slug").notNullable().primary()
      topics.string("description").notNullable();
    });
  };
  
  exports.down = function(connection) {
    console.log("dropping topics table");
    return connection.schema.dropTable("topics");
  };
  