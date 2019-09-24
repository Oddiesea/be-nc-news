const connection = require("../db/connection");

exports.getAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(allTopics => {
     return {topics:allTopics};
    });
};
