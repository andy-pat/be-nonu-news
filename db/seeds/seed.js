const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const { formatTimestamp, formatCommentData, createArticleRef } = require('../utils/data-manipulation')

exports.seed = function (knex) {

  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    }).then(() => {
      return knex
        .insert(topicData)
        .into('topics')
        .returning('*')
    }).then(() => {
      return knex
        .insert(userData)
        .into('users')
        .returning('*')
    }).then(() => {
      const formattedArticleData = formatTimestamp(articleData)
      return knex
        .insert(formattedArticleData)
        .into('articles')
        .returning('*')
        .then(articles => {
          const articleRef = createArticleRef(articles)
          const formatComment = formatCommentData(commentData, articleRef)
        })
      
    });
  }







// const { data } = require('../data')

// exports.seed = (connection) => {
//      return connection.migrate
//      .rollback()
//      .then(() => {
//         return connection.migrate.latest();
//         });
//      .then(() => {
//         /// INSERT DATA (IN THE SAME ORDER AS TABLES CREATED)
//         return connection.insert(data).into('myTable').returning('\*')
//         .then((myTableRows) => {
//         const formattedRows = 

//     }); 
// }
