const express = require('express')
const app = express()
const apiRouter = require('./routes/apiRouter')
const { handlePSQLerrors } = require('./controllers/errors')


app.use(express.json())

app.use('/api', apiRouter)

app.use(handlePSQLerrors)



module.exports = app;