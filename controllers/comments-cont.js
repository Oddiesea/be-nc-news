const { postComment, getCommentsByArticle } = require("../models/comments-mod");

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
      if (commentsData.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Bad request, article doesn't exist."
        });
      res.status(200).send(commentsData);
    })
    .catch(next);
};
