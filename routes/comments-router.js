const articlesRouter = require("express").Router();
const { updateCommentVotes, removeCommentById } = require("../controllers/comments-cont");
const { handle405Errors } = require("../errors/errors");

articlesRouter.route("/:comment_id").patch(updateCommentVotes).delete(removeCommentById).all(handle405Errors);

module.exports = articlesRouter;
