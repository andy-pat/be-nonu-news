const topicsRouter = require('express').Router()
const { getTopics, addTopic } = require('../controllers/topics')
const { send405 } = require('../controllers/errors')


topicsRouter.route('/')
    .get(getTopics)
    .post(addTopic)
    .all(send405)



module.exports = topicsRouter;