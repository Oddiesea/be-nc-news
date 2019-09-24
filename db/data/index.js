const ENV = process.env.NODE_ENV || "development";
const development = require("../data/development-data");
const test = require("../data/test-data");

const seedData = {
  development,
  test
};

module.exports = seedData[ENV];