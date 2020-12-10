const {
  getArticles,
  deleteArticle,
  patchArticleVotes,
  getArticle,
  postArticle,
  postComment,
  getComments,
} = require("../models/articles");
const connection = require("../db/connection");

exports.fetchComments = (req, res, next) => {
  const id = req.params.article_id;
  const sortBy = req.query.sortby;
  const order = req.query.order;
  getComments(id, sortBy, order)
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found." });
      }
      res.status(200).send(comments);
    })
    .catch((error) => {
      next(error);
    });
};
exports.fetchArticles = (req, res, next) => {
  const sortBy = req.query.sortby;
  const order = req.query.order;
  const author = req.query.author;
  const topic = req.query.topic;
  const comment_count = req.query.comment_count;

  getArticles(sortBy, order, author, topic)
    .then((articles) => {
      console.log;
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeArticle = (req, res, next) => {
  const article = req.params.article_id;
  deleteArticle(article)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArticleVotes = (req, res, next) => {
  const id = req.params.article_id;
  const vote = req.body.inc_votes;
  patchArticleVotes(id, vote)
    .then((updatedArticle) => {
      res.status(200).send(votes);
    })
    .catch((error) => {
      next(error);
    });
};

exports.fetchArticle = (req, res, next) => {
  const id = req.params.article_id;
  getArticle(id)
    .then((article) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, msg: "Article not found." });
      }
      res.status(200).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};

exports.addArticle = (req, res, next) => {
  const body = req.body;
  postArticle(body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};

exports.addComment = (req, res, next) => {
  const id = req.params.article_id;
  const comment = req.body;
  postComment(id, comment)
    .then((comment) => {
      const username = Object.values(comment[0])[1];
      if (username === null) {
        return Promise.reject({
          status: 400,
          msg: "malformed body / missing required fields",
        });
      } else res.status(201).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};
