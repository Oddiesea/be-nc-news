exports.handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Page not found." });
};
exports.handleCustomErrors = (err, req, res, next) => {
    res.status(err.status).send({ msg: err.msg });
};
exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "Server error." });
};
