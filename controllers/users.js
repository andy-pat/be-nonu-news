const { fetchUser } = require('../models/users')


exports.getUserByUsername = (req, res, next) => {
    const username = req.params.username
    fetchUser(username)
        .then(user => {
        if (user.length === 0) {
         return Promise.reject({
             status: 400,
             msg: "User not found"
         });
        } else
            res.status(200).send({ user })
        })
        .catch(err => {
            next(err)
        })
}