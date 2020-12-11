const connection = require("../db/connection");
const { queryBuilder } = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.getArticles = (
  sortBy = "articles.created_at",
  order = "desc",
  author,
  topic
) => {
  return connection
    .select(
      "articles.author",
      "title",
      "articles.article_id",
      "topic",
      "articles.created_at",
      "articles.votes"
    )
    .count("comments.article_id AS comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sortBy, order)
    .modify((query) => {
      if (author) {
        query.where("articles.author", "=", author);
      }
      if (topic) {
        query.where("articles.topic", "=", topic);
      }
    })
    .then((articles) => {
      return articles;
    });
};

exports.deleteArticle = (id) => {
  return connection("articles").where("article_id", id).del();
};

exports.patchArticleVotes = (id, vote) => {
  return connection("articles")
    .returning("*")
    .where("article_id", id)
    .increment("votes", vote)
    .then((updated) => {
      console.log(updated);
      return updated[0];
    });
};

exports.getArticle = (id) => {
  return connection("articles")
    .select("*")
    .where("article_id", id)
    .then((articles) => {
      return articles[0];
    });
};

exports.postArticle = (body) => {
  return connection("articles")
    .returning("*")
    .insert([
      {
        title: body.title,
        topic: body.topic,
        author: body.author,
        body: body.body,
      },
    ])
    .then((newArticle) => {
      return newArticle;
    });
};

exports.postComment = (id, comment) => {
  return connection("comments")
    .returning("*")
    .insert([{ author: comment.username, article_id: id, body: comment.body }])
    .then((newComment) => {
      return newComment;
    });
};

exports.getComments = (id, sortBy = "comments.created_at", order = "desc") => {
  return connection("comments")
    .select("*")
    .where("article_id", id)
    .orderBy(sortBy, order)
    .then((comments) => {
      return comments;
    });
};
