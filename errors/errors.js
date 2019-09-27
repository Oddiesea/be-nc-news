exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handleCustomPSQLErrors = (err, req, res, next) => {
  const PSQLerrs = {
    "22P02": { status: 400, msg: "Invalid input integer expected." },
    "23502": { status: 400, msg: "Bad request , missing values" },
    "42703":  { status: 400, msg: "Bad request , references an invalid column." },
    "23503":
       err.constraint === "comments_author_foreign"
        ? {
            status: 422,
            msg: "Unprocessable entity , references non-existent item"
          }
        : { status: 404, msg: "Bad request , references non-existent item" }
  }

  if (err.code in PSQLerrs) {
    res.status(PSQLerrs[err.code].status).send({ msg: PSQLerrs[err.code].msg });
  } else next(err);
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "Server error." });
};




exports.handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Page not found." });
};
exports.handle405Errors = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed." });
};
