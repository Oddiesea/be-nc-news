const notTest = process.env.NODE_ENV === "test" ? false : true;

exports.up = function(connection) {
  return connection.schema.createTable("topics", topics => {
    if (notTest) console.log("creating topics table");
    topics
      .string("slug")
      .notNullable()
      .primary();
    topics.string("description").notNullable();
  });
};

exports.down = function(connection) {
  if (notTest) console.log("dropping topics table");
  return connection.schema.dropTable("topics");
};
