const { getAllTopics } = require("../models/topics-mod");

exports.requestAllTopics = (req, res, next) => {
    getAllTopics().then(allTopics => {
      res.status(200).send(allTopics);
    })
    .catch(next);
};
