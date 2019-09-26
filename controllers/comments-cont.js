const {
  postComment,
  getCommentsByArticle,
  patchCommentVotes,
  deleteCommentById
} = require("../models/comments-mod");

exports.sendComment = (req, res, next) => {
  postComment(req)
    .then(([postedComment]) => {
      res.status(201).send(postedComment);
    })
    .catch(next);
};

exports.requestCommentsByArticle = (req, res, next) => {
  getCommentsByArticle(req)
    .then(commentsData => {
      res.status(200).send(commentsData);
    })
    .catch(next);
};

exports.updateCommentVotes = (req, res, next) => {
  patchCommentVotes(req)
    .then(commentData => {
      res.status(200).send(commentData);
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
