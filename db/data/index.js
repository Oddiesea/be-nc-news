const ENV = process.env.NODE_ENV || "development";
const development = require("../data/development-data");
const test = require("../data/test-data");

const seedData = { test, development, production: development };

module.exports = seedData[ENV];
