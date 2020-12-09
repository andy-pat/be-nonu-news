process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe.only("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });
  describe("GET", () => {
    test("JSON of all available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((api) => {});
    });
  });

  describe("/topics", () => {
    describe("GET", () => {
      test("responds with all topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then((res) => {
            expect(res.body.topics).toEqual(expect.any(Array));
            expect(Object.keys(res.body.topics[0])).toEqual(
              expect.arrayContaining(["slug", "description"])
            );
            expect(res.body.topics.length).toBe(3);
          });
      });
    });
    describe("POST", () => {
      test("create new topic, check length of get all topics increased", () => {
        return request(app)
          .post("/api/topics")
          .send({
            slug: "fretless bass",
            description: "swim with the dolphins",
          })
          .expect(201)
          .then(() => {
            return request(app)
              .get("/api/topics")
              .expect(200)
              .then((res) => {
                expect(res.body.topics).toEqual(expect.any(Array));
                expect(Object.keys(res.body.topics[0])).toEqual(
                  expect.arrayContaining(["slug", "description"])
                );
                expect(res.body.topics.length).toBe(4);
              });
          });
      });
    });
  });
  describe("/users", () => {
    describe("GET", () => {
      test("reqsponds with all users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then((res) => {});
      });
      test("respoonds with user data by username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then((res) => {
            expect(res.body.user).toEqual([
              {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              },
            ]);
          });
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {
      test("returns specified article data", () => {
        return request(app)
          .get("/api/articles/2")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              article: {
                article_id: 2,
                title: "Sony Vaio; or, The Laptop",
                body:
                  "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                votes: 0,
                topic: "mitch",
                created_at: "2014-11-16T00:00:00.000Z",
                author: "icellusedkars",
              },
            });
          });
      });
      test("array of comments for the specified article", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then((res) => {
            const properties = Object.keys(res.body[0]);
            expect(properties).toEqual([
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body",
            ]);
          });
      });
      test("default sort_by is created_at", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then((res) => {
            expect(res.body).toBeSortedBy("created_at", {
              descending: "true",
            });
          });
      });
      test("default sortby is created_at", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then((res) => {
            expect(res.body).toBeSortedBy("created_at", {
              descending: "true",
            });
          });
      });
      test("sorts by votes ascending", () => {
        return request(app)
          .get("/api/articles/1/comments?sortby=votes&order=asc")
          .expect(200)
          .then((res) => {
            expect(res.body).toBeSortedBy("votes", {
              ascending: "true",
            });
          });
      });
      test("responds with all article containing correct properties", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            const properties = Object.keys(res.body.articles[0]);
            expect(properties).toEqual([
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count",
            ]);
          });
      });
      test("articles default sorted by date (descending)", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            expect(res.body).toBeSortedBy("created_at", {
              descending: "true",
            });
          });
      });
      test("articles sorted by username", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then((res) => {
            const allAuthorsMatch = res.body.articles.every(
              (article) => article.author === "butter_bridge"
            );
            expect(allAuthorsMatch).toBe(true);
          });
      });
      test("articles sorted by topic", () => {
        return request(app)
          .get("/api/articles?topic=coding")
          .expect(200)
          .then((res) => {
            const allTopicsMatch = res.body.articles.every(
              (article) => article.topic === "coding"
            );
            expect(allTopicsMatch).toBe(true);
          });
      });
    });

    describe("PATCH", () => {
      test("updates article votes with given vote amount", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              updatedArticle: {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 101,
                topic: "mitch",
                created_at: "2018-11-15T00:00:00.000Z",
                author: "butter_bridge",
              },
            });
          });
      });
      test("updates article votes with given vote amount", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -1 })
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              updatedArticle: {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 99,
                topic: "mitch",
                created_at: "2018-11-15T00:00:00.000Z",
                author: "butter_bridge",
              },
            });
          });
      });
    });

    describe("POST", () => {
      test("post article", () => {
        return request(app)
          .post("/api/articles")
          .send({
            title: "new article",
            topic: "mitch",
            author: "icellusedkars",
            body: "heres a new body",
          })
          .expect(201);
      });
      test("post comment to article with correct properties", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "this is a comment",
          })
          .expect(201)
          .then((res) => {
            const properties = Object.keys(res.body.comment[0]);
            expect(properties).toEqual([
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body",
            ]);
          });
      });
    });

    describe("DELETE", () => {
      test("delete article by article_id", () => {
        return request(app).delete("/api/articles/1").expect(204);
      });
      test("checking length is -1 after deletion", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            expect(res.body.articles.length).toBe(12);
            return request(app)
              .delete("/api/articles/1")
              .expect(204)
              .then(() => {
                return request(app)
                  .get("/api/articles")
                  .expect(200)
                  .then((res) => {
                    expect(res.body.articles.length).toBe(11);
                  });
              });
          });
      });
    });
  });
  describe("/comments", () => {
    describe("PATCH", () => {
      test("object indicates how much the votes property will be updated by", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              votes: [
                {
                  comment_id: 1,
                  author: "butter_bridge",
                  article_id: 9,
                  votes: 17,
                  created_at: "2017-11-22T00:00:00.000Z",
                  body:
                    "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                },
              ],
            });
          });
      });
    });
    describe("DELETE", () => {
      test("delete comment by comment_id", () => {
        return request(app).delete("/api/comments/1").expect(204);
      });
    });
  });
  describe("ERROR HANDLING", () => {
    test("path does not exist", () => {
      const invalidMethods = ["get", "patch", "put", "post", "delete"];
      const methodsPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/nonexistent")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not Found");
          });
      });
      return Promise.all(methodsPromises);
    });

    test("article does not exist", () => {
      return request(app)
        .get("/api/articles/10000")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Article not found.");
        });
    });
    test("invalid article_id", () => {
      return request(app)
        .get("/api/articles/myArticle")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe(
            'select * from "articles" where "article_id" = $1 - invalid input syntax for type integer: "myArticle"'
          );
        });
    });
    test("post article - malformed body, missing topic", () => {
      return request(app)
        .post("/api/articles")
        .send({
          title: "new article",
          topic: "not a topic",
          author: "icellusedkars",
          body: "heres a new body",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe(
            'insert into "articles" ("author", "body", "title", "topic") values ($1, $2, $3, $4) returning * - insert or update on table "articles" violates foreign key constraint "articles_topic_foreign"'
          );
        });
    });
    test("post comment - malformed body / missing required fields", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("malformed body / missing required fields");
        });
    });
    test("invalid methods on path", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodsPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid method.");
          });
      });
      return Promise.all(methodsPromises);
    });
    test("invalid username", () => {
      return request(app)
        .get("/api/users/notAUser")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("User not found");
        });
    });
    test("invalid methods on path", () => {
      const invalidMethods = ["patch", "put", "post", "delete"];
      const methodsPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/users/butter_bridge")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid method.");
          });
      });
      return Promise.all(methodsPromises);
    });
    test("invalid article id", () => {
      return request(app)
        .get("/api/articles/01392/comments")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Article not found.");
        });
    });
    test("invalid column queries", () => {
      return request(app)
        .get("/api/articles/1/comments?sortby=hashtag")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe(
            'select * from "comments" where "article_id" = $1 order by "hashtag" desc - column "hashtag" does not exist'
          );
        });
    });
    test("invalid queries ignored", () => {
      return request(app)
        .get("/api/articles/1/comments?hashtag=hashtag")
        .expect(200);
    });
    test("malformed vote", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("malformed body / missing required fields");
        });
    });
    test("invalid comment_id, nothing to delete", () => {
      return request(app)
        .delete("/api/comments/1000")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Comment not found");
        });
    });
  });
});
