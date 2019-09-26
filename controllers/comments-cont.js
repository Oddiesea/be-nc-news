const {
  postComment,
  getCommentsByArticle,
  patchCommentVotes,
  deleteCommentById
} = require("../models/comments-mod");

exports.sendComment = (req, res, next) => {
  postComment(req)
    .then(([comment]) => {
      res.status(201).send({comment});
    })
    .catch(next);
};

exports.requestCommentsByArticle = (req, res, next) => {
  getCommentsByArticle(req)
    .then(comments => {
      res.status(200).send({comments});
    })
    .catch(next);
};

exports.updateCommentVotes = (req, res, next) => {
  patchCommentVotes(req)
    .then(comment => {
      res.status(200).send({comment});
    })
    .catch(next);
};

exports.removeCommentById = (req, res, next) => {
  deleteCommentById(req)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
