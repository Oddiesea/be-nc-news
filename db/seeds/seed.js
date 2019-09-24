const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(connection) {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      const topicsInsertions = connection("topics").insert(topicData, "*");
      const usersInsertions = connection("users").insert(userData, "*");

      return Promise.all([topicsInsertions, usersInsertions])
        .then(enteredRows => {
          console.log(
            `inserted ${enteredRows[0].length} into the topics table\ninserted ${enteredRows[1].length} into the users table`
          );

          //correct date format then insert into table
          const formattedArticleData = formatDates(articleData);

          return connection("articles").insert(formattedArticleData, "*");
        })
        .then(articleRows => {
          console.log(`inserted ${articleRows.length} into the articles table`);

          //correct date format
          const formattedCommentData = formatDates(commentData);
          const articlesRef = makeRefObj(articleRows);
          const formattedComments = formatComments(
            formattedCommentData,
            articlesRef
          );

          return connection("comments").insert(formattedComments, '*');
        })
        .then(commentRows => {
          console.log(`inserted ${commentRows.length} into comments table`);
        });
    });
};
