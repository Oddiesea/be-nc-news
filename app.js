const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router.js");
const {
  handleCustomErrors,
  handleCustomPSQLErrors,
  handle404Errors,
  handle500Errors
} = require("./errors/errors");

//midleware
app.use(express.json());
//routing
app.use("/api", apiRouter);
app.all("/*", handle404Errors);
//error handlers
app.use(handleCustomErrors);
app.use(handleCustomPSQLErrors);
app.use(handle500Errors);

module.exports = app;
