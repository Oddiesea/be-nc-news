const notTest = process.env.NODE_ENV === "test" ? false : true;

exports.up = function(connection) {
  return connection.schema.createTable("comments", comments => {
    if (notTest) console.log("creating comments table");
    comments.increments("comment_id").primary();
    comments.string("author").references("users.username");
    comments
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    comments.integer("votes").defaultTo(0);
    comments.timestamp("created_at").notNullable();
    comments.text("body").notNullable();
  });
};

exports.down = function(connection) {
  if (notTest) console.log("dropping comments table");
  return connection.schema.dropTable("comments");
};
