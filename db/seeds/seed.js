const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

exports.seed = function (knex) {

  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    });
    .then(())
};


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
