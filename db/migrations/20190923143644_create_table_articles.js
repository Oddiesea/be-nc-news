const notTest = process.env.NODE_ENV === "test" ? false : true;

exports.up = function(connection) {
  return connection.schema.createTable("articles", articles => {
    if (notTest) console.log("creating articles table");
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
    articles.timestamp("created_at").defaultTo("NOW");
  });
};

exports.down = function(connection) {
  if (notTest) console.log("dropping articles table");
  return connection.schema.dropTable("articles");
};
