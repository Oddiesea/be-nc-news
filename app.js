const express = require("express");
const app = express();
const cors = require('cors');
const apiRouter = require("./routes/api-router.js");

app.use(cors());

const {
  handleCustomErrors,
  handleCustomPSQLErrors,
  handle404Errors,
  handle500Errors
} = require("./errors/errors");

app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", handle404Errors);

app.use(handleCustomErrors);
app.use(handleCustomPSQLErrors);
app.use(handle500Errors);

module.exports = app;
