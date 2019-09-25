const articlesRouter = require("express").Router();
const {
  requestArticleById,
  updateArticleVotes,
  requestAllArticles
} = require("../controllers/articles-cont.js");
const {
  sendComment,
  requestCommentsByArticle
} = require("../controllers/comments-cont");
const { handle405Errors } = require("../errors/errors");

articlesRouter.route("/").get(requestAllArticles);

articlesRouter
  .route("/:article_id")
  .get(requestArticleById)
  .patch(updateArticleVotes)
  .all(handle405Errors);

articlesRouter
  .route("/:article_id/comments")
  .get(requestCommentsByArticle)
  .post(sendComment)
  .all(handle405Errors);

module.exports = articlesRouter;
