const { getArticles, patchArticleVotes } = require("../models/articles-mod");

exports.requestArticleById = (req, res, next) => {
  getArticles(req)
    .then(([articleData]) => {
      res.status(200).send(articleData);
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
    patchArticleVotes(req)
      .then(articleData => {
        res.status(200).send(articleData);
      })
      .catch(next);
};

exports.requestAllArticles = (req, res, next) => {
  getArticles(req)
    .then(articleData => {
      res.status(200).send(articleData);
    })
    .catch(next);
};
