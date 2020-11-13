const connection = require('../db/connection')

exports.fetchUsers = () => {
    return connection
    .select('*')
    .from('users')
    .then((users) => {
        return users
    })

}

exports.fetchUser = (username) => {
    return connection
        .select('*')
        .from('users')
        .where('username', '=', username)
        .then(user => {
            return user
        })
}

