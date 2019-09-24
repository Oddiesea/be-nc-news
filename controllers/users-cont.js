const { getUserByUsername } = require("../models/users-mod");

exports.requestUserByUsername = (req, res, next) => {
    const {username} = req.params;
    getUserByUsername(username).then((userData)=> {
        res.status(200).send(userData);
    })
    .catch(next);
}