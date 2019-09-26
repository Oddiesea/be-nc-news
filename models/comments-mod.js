const connection = require("../db/connection");

exports.postComment = ({ body, params: { article_id } }) => {
  const input = {
    author: body.username,
    body: body.body,
    article_id
  };
  return connection("comments").insert(input, "*");
};

exports.getCommentsByArticle = ({
  params: { article_id },
  query: { sort_by = "created_at", order = "desc" }
}) => {
  if (sort_by === "username") sort_by = "author";
  return connection("comments")
    .select("comments.comment_id", "votes", "created_at", "body", "author")
    .where({ article_id })
    .orderBy(sort_by, order)
    .then(commentsData => {
      if (commentsData.length === 0) {
        return connection("articles")
          .select("*")
          .where({ article_id })
          .then(articleData => {
            if (articleData.length === 0) {
              return Promise.reject({
                status: 404,
                msg: "Article not found."
              });
            } else return commentsData;
          });
      } else return commentsData;
    });
};

exports.patchCommentVotes = ({
  params: { comment_id },
  body: { inc_votes }
}) => {
  if (typeof inc_votes === "undefined")
    return Promise.reject({
      status: 400,
      msg: "Bad request, invalid update object"
    });
  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(([commentData]) => {
      if (commentData === undefined)
        return Promise.reject({ status: 404, msg: "Comment not found." });
      return commentData;
    });
};

exports.deleteCommentById = ({ params: { comment_id } }) => {
  return connection("comments")
    .where({ comment_id })
    .del()
    .returning("*")
    .then(([commentData]) => {
      if (commentData === undefined)
        return Promise.reject({ status: 404, msg: "Comment not found." });
    });
};
