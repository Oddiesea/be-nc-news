const connection = require("../db/connection");

exports.getAllTopics = () => {
    console.log("here!@#@!")
  return connection("topics")
    .select("*")
    .then(allTopics => {
      console.log(allTopics);
    });
};
