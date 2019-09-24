exports.up = function(connection) {
    return connection.schema.createTable("users", users => {
      console.log("creating users table");
    users.string("username").notNullable().primary()
    users.string("name").notNullable();
    users.string("avatar_url").notNullable();
  });
};

exports.down = function(connection) {
  console.log("dropping users table");
  return connection.schema.dropTable("users");
};
