const connection = require('../db/connection')

exports.fetchTopics = () => {
    return connection
        .select('*')
        .from('topics')
        .then(topicsRows => {
            return topicsRows
        })
}

exports.createTopic = (topic) => {
    return connection('topics')
    .returning('*')
    .insert([{slug: topic.slug, description: topic.description}])
}