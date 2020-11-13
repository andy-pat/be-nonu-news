const articlesRouter = require('express').Router()
const { addArticle, fetchArticles, removeArticle, updateArticleVotes, fetchArticle, addComment, fetchComments } = require('../controllers/articles');
const { send405 } = require('../controllers/errors')

articlesRouter.route('/')
    .get(fetchArticles)
    .post(addArticle)
    .all(send405)

articlesRouter.route('/:article_id')
    .delete(removeArticle)
    .patch(updateArticleVotes)
    .get(fetchArticle)
    .all(send405)

articlesRouter.route('/:article_id/comments')
    .post(addComment)
    .get(fetchComments)
    .all(send405)



module.exports = articlesRouter;