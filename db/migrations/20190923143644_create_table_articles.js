exports.up = function(connection) {
  return connection.schema.createTable("articles", articles => {
      console.log("creating articles table");
    articles.increments("article_id").primary();
    articles.string("title").notNullable();
    articles.text("body").notNullable();
    articles.integer("votes").defaultTo(0);
    articles
      .string("topic")
      .references("topics.slug")
      .notNullable();
    articles
      .string("author")
      .references("users.username")
      .notNullable();
    articles.timestamp("created_at").notNullable();
  });
};

exports.down = function(connection) {
    console.log("dropping articles table");
  return connection.schema.dropTable("articles");
};
