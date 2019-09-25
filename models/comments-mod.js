const connection = require("../db/connection");

exports.postComment = ({ body, params: { article_id } }) => {
  const input = {
    author: body.username,
    body: body.body,
    article_id,
  };
  return connection("comments").insert(input, "*")
};

exports.getCommentsByArticle = ({params: { article_id },query:{sort_by = "created_at", order = "desc"}}) => {
  if (sort_by === 'username') sort_by = "author";
  return connection('comments').select('comments.comment_id','votes','created_at','body', 'author').where({article_id}).orderBy(sort_by, order)
}