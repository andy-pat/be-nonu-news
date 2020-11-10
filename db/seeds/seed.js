const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const { formatTimestampProperty, formatCommentData, createArticleReference } = require('../utils/data-manipulation')

exports.seed = function (knex) {

  // ROLLING BACK PREVIOUS MIGRATIONS AND MIGRATING TO LATEST
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    }).then(() => {

      // INSERTING TOPIC DATA
      return knex
        .insert(topicData)
        .into('topics')
        .returning('*')
    }).then((topicRows) => {
      console.log(`Inserted ${topicRows.length} Topics`)

      // INSERTING USER DATA
      return knex
        .insert(userData)
        .into('users')
        .returning('*')
    }).then((userRows) => {
      console.log(`Inserted ${userRows.length} Users`)

      // CHANGING TIMESTAMP ON ARTICLE DATA
      const formattedArticles = formatTimestampProperty(articleData)

      // INSERTING ARTICLE DATA
      return knex
        .insert(formattedArticles)
        .into('articles')
        .returning('*')
        .then(articlesRows => {
          console.log(`Inserted ${articlesRows.length} Articles`)
          // REFORMATTING COMMENTS DATA
          const articleRef = createArticleReference(articlesRows)
          const comments = formatTimestampProperty(commentData)
          const formattedComments = formatCommentData(comments, articleRef)

          // INSERTING COMMENT DATA
          return knex
            .insert(formattedComments)
            .into('comments')
            .returning('*')
        }).then(commentsRows => {
          console.log(`Inserted ${commentsRows.length} Comments`)
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
