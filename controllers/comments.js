const { patchVotes, deleteComment } = require("../models/comments");

exports.updateVotes = (req, res, next) => {
  const id = req.params.comment_id;
  const vote = req.body.inc_votes;

  patchVotes(id, vote)
    .then((votes) => {
      if (vote === undefined || typeof vote !== "number") {
        return Promise.reject({
          status: 400,
          msg: "malformed body / missing required fields",
        });
      } else res.status(200).send(votes);
    })
    .catch((error) => {
      next(error);
    });
};

exports.removeComment = (req, res, next) => {
  const id = req.params.comment_id;
  deleteComment(id)
    .then((result) => {
      if (result === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};
