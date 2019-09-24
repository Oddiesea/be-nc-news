const usersRouter = require("express").Router();
const { requestUserByUsername } = require("../controllers/users-cont.js");
const { handle405Errors } = require("../errors/errors");

usersRouter
  .route("/:username")
  .get(requestUserByUsername)
  .all(handle405Errors);

module.exports = usersRouter;
