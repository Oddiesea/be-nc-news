const PSQLerrs = {
  '22P02' : {status: 400, msg: "Invalid input integer expected."}

}

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};
exports.handleCustomPSQLErrors = (err, req, res, next) => {
  if (err.code in PSQLerrs) res.status(PSQLerrs[err.code].status).send({ msg: PSQLerrs[err.code].msg});
  else next(err);
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server error." });
};

//No err, routed
exports.handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Page not found." });
};
exports.handle405Errors = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed." });
};
