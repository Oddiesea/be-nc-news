const { getArticleById, patchArticleVotes } = require("../models/articles-mod");

exports.requestArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then(articleData => {
      res.status(200).send(articleData);
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  if (!("inc_votes" in req.body) || Object.keys(req.body).length > 1)
    res.status(400).send({
      msg: "Bad request, invalid update object"
    });
  else
    patchArticleVotes(article_id, inc_votes)
      .then(articleData => {
        res.status(200).send(articleData);
      })
      .catch(next);
};
