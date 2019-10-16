const { getUserByUsername, getAllUsers } = require("../models/users-mod");

exports.requestUserByUsername = (req, res, next) => {
  getUserByUsername(req)
    .then(userData => {
      res.status(200).send(userData);
    })
    .catch(next);
};

exports.requestAllUsers = (req, res, next) => {
  getAllUsers().then(allUsers => {
    res.status(200).send(allUsers);
  }).catch(next);
}