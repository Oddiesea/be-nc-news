const usersRouter = require("express").Router();
const {
  requestUserByUsername,
  requestAllUsers
} = require("../controllers/users-cont.js");
const { handle405Errors } = require("../errors/errors");

usersRouter
  .route("/")
  .get(requestAllUsers)
  .all(handle405Errors);

usersRouter
  .route("/:username")
  .get(requestUserByUsername)
  .all(handle405Errors);


module.exports = usersRouter;
