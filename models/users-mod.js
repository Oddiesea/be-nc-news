const connection = require("../db/connection");

exports.getUserByUsername = username => {
  return connection("users")
    .select("*")
    .where({ username })
    .then(([userData]) => {
      if (userData === undefined)
        return Promise.reject({ status: 404, msg: "User not found." });
      return userData;
    });
};
