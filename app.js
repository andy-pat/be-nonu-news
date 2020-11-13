const express = require('express')
const app = express()
const apiRouter = require('./routes/api')
const { send404, handleCustomErrors, handlePSQLErrors, handle500errors } = require('./controllers/errors')


app.use(express.json())

app.use('/api', apiRouter)

app.all('/*', send404)

app.use(handleCustomErrors)

app.use(handlePSQLErrors)

app.use(handle500errors)



module.exports = app;