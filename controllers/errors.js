
exports.handlePSQLerrors = (err, req, res, next) => {
    console.log(err.code)
    res.status(500).send(err)

}