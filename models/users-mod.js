const connection = require("../db/connection");

exports.getUserByUsername = ({ params: { username } }) => {
  return connection("users")
    .select("*")
    .where({ username })
    .then(([userData]) => {
      if (userData === undefined)
        return Promise.reject({ status: 404, msg: "User not found." });
      return userData;
    });
};

exports.getAllUsers = () => {
  return connection("users")
    .select("*")
    .then(allUsers => {
     return {users:allUsers};
    });
};
