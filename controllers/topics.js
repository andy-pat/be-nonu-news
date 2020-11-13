const { fetchTopics, createTopic } = require('../models/topics')


exports.getTopics = (req, res, next) => {
    fetchTopics()
        .then(topics => {
            res.status(200).send({ topics })
        })
        .catch(err => {
            next(err)
        })
}

exports.addTopic = (req, res, next) => {
    const topic = req.body
    createTopic(topic)
        .then((newTopic) => {
            res.status(201).send({ newTopic })
        })
        .catch(err => {
            next(err)
        })
}