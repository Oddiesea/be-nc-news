const notTest = process.env.NODE_ENV === "test" ? false : true;

exports.up = function(connection) {
  return connection.schema.createTable("users", users => {
    if (notTest) console.log("creating users table");
    users
      .string("username")
      .notNullable()
      .primary();
    users.string("name").notNullable();
    users.string("avatar_url").notNullable();
  });
};

exports.down = function(connection) {
  if (notTest) console.log("dropping users table");
  return connection.schema.dropTable("users");
};
