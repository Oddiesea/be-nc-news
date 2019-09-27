const connection = require("../db/connection");

exports.getArticles = ({
  params: { article_id },
  query: { sort_by = "created_at", order, author, topic }
}) => {
  let testArr = [];
  let queryCorrect = true;
  order === "asc" ? (order = "asc") : (order = "desc");
  return connection("articles")
    .select("articles.*")
    .count("comment_id AS comment_count")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify(query => {
      if (article_id) query.where("articles.article_id", article_id);
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .then(articleData => {
      if (articleData.length === 0) {
        if (author) testArr.push(["users", "username", author]);
        if (topic) testArr.push(["topics", "slug", topic]);

        if (testArr.length === 0) return Promise.reject({ status: 404, msg: "Article not found." })

        testArr = testArr.map(testElem => {
          return genericSelect(testElem).catch();
        });

        return Promise.all(testArr)
          .then(resultArr => {
            return resultArr.find(result=> result.length === 0)
              ? Promise.reject({ status: 404, msg: "Article not found." })
              : articleData;
          })
          .catch();
      } else return articleData;
    });
};

exports.patchArticleVotes = ({
  params: { article_id },
  body: { inc_votes }
}) => {
  if (typeof inc_votes === "undefined")
    return Promise.reject({
      status: 400,
      msg: "Bad request, invalid update object"
    });
  else
    return connection("articles")
      .where({ article_id })
      .increment("votes", inc_votes)
      .returning("*")
      .then(([articleData]) => {
        if (articleData === undefined)
          return Promise.reject({ status: 404, msg: "Article not found." });
        return articleData;
      });
};

const genericSelect = testArr => {
  return connection(testArr[0])
    .select("*")
    .where(testArr[1], testArr[2]);
};
