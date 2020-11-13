exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    }
    else {
        next (err)
    }
}

exports.handlePSQLErrors = (err, req, res, next) => {
    const badReqCodes = [ '22P02', '42703', '23503' ]
    if(badReqCodes.includes(err.code)) {
        res.status(400).send({ msg: err.message || 'Bad Request.'})
    } else {
        next(err)
    }
}

exports.send404 = (req, res, next) => {
    res.status(404).send({ msg: "Not Found"})
} 

exports.send405 = (req, res, next) => {
    res.status(405).send({ msg: 'Invalid method.'})
}


exports.handle500errors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg: 'internal server error!'})
    .catch(err => {
        next(err)
    })

}