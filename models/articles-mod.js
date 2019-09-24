const connection = require("../db/connection");

exports.getArticleById = article_id => {
  return connection("articles")
    .select("*")
    .where({ article_id })
    .then(([articleData]) => {
      if (articleData === undefined)
        return Promise.reject({ status: 404, msg: "Article not found." });
      console.log(article_id);
      return connection("comments").select('comment_id').where({article_id}).then(relatedComments=>{
        articleData.comment_count = relatedComments.length;
        return articleData;
      })
    });
};

exports.patchArticleVotes = (article_id, inc_votes) => {
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
