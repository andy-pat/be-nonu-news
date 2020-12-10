const connection = require("../db/connection");

exports.patchVotes = (id, vote) => {
  return connection("comments")
    .returning("*")
    .where("comment_id", id)
    .increment("votes", vote)
    .then((updated) => {
      return updated;
    });
};

exports.deleteComment = (id) => {
  return connection("comments").where("comment_id", id).del();
};
