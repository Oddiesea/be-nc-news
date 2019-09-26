const { getArticles, patchArticleVotes } = require("../models/articles-mod");

exports.requestArticleById = (req, res, next) => {
  getArticles(req)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  patchArticleVotes(req)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.requestAllArticles = (req, res, next) => {
  getArticles(req)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
