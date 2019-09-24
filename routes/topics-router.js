const topicsRouter = require("express").Router();
const { requestAllTopics } = require("../controllers/topics-cont.js");
const {handle405Errors} = require('../errors/errors')

topicsRouter.route("/").get(requestAllTopics).all(handle405Errors);

module.exports = topicsRouter;
