const topicsRouter = require("express").Router();
const { requestAllTopics } = require("../controllers/topics-cont.js");

topicsRouter.route("/").get(requestAllTopics);

module.exports = topicsRouter;
