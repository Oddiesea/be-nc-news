const articlesRouter = require("express").Router();
const { requestArticleById,updateArticleVotes } = require("../controllers/articles-cont.js");
const { handle405Errors } = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(requestArticleById)
  .patch(updateArticleVotes)
  .all(handle405Errors);

module.exports = articlesRouter;
