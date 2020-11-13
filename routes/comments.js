const commentsRouter = require('express').Router()
const { updateVotes, removeComment } = require('../controllers/comments')
const { send405 } = require('../controllers/errors')

commentsRouter.route('/:comment_id')
    .patch(updateVotes)
    .delete(removeComment)
    .all(send405)



module.exports = commentsRouter;