const { getUserByUsername } = require("../models/users-mod");

exports.requestUserByUsername = (req, res, next) => {
    getUserByUsername(req).then((userData)=> {
        res.status(200).send(userData);
    })
    .catch(next);
}