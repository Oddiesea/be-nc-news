process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-sorted"));

const app = require("../app");
const request = require("supertest")(app);
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("General Errors", () => {
  it("Status 404: page not found", () => {
    return request
      .get("/ap0/topics")
      .expect(404)
      .then(({ body }) => {
        expect(body).to.eql({ msg: "Page not found." });
      });
  });
});
describe("/api", () => {
  describe("/topics", () => {
    describe("GET", () => {
      it("Status 200: returns an object containing an array of all topics", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.eql({
              topics: [
                {
                  slug: "mitch",
                  description: "The man, the Mitch, the legend"
                },
                { slug: "cats", description: "Not dogs" },
                { slug: "paper", description: "what books are made of" }
              ]
            });
          });
      });
    });
    describe("Disallowed Methods", () => {
      it("Status 405: returns method not allowed for all but get method", () => {
        const dissalllowedMethods = ["patch", "post", "delete"];
        dissalllowedMethods.map(method => {
          return request[method]("/api/topics")
            .expect(405)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Method not allowed." });
            });
        });
        return Promise.all(dissalllowedMethods);
      });
    });
  });
  describe("/users", () => {
    describe("/", () => {
      describe("GET", () => {
        it("Status 200: returns all user data in an array of correct length", () => {
          return request
            .get("/api/users/")
            .expect(200)
            .then(({ body: { users } }) => {
              expect(users.length).to.equal(4);
            });
        });
      });
    });
    describe("Disallowed Methods", () => {
      it("Status 405: returns method not allowed for all but get method", () => {
        const dissalllowedMethods = ["patch", "post", "delete"];
        dissalllowedMethods.map(method => {
          return request[method]("/api/users/")
            .expect(405)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Method not allowed." });
            });
        });
        return Promise.all(dissalllowedMethods);
      });
    });
    describe("/:username", () => {
      describe("GET", () => {
        it("Status 200: returns user data object when passed correct username as parametic", () => {
          return request
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.eql({
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              });
            });
        });
        it("Status 404: returns error when queried with non-existent username", () => {
          return request
            .get("/api/users/user_not_real")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "User not found." });
            });
        });
      });
    });
    describe("Disallowed Methods", () => {
      it("Status 405: returns method not allowed for all but get method", () => {
        const dissalllowedMethods = ["patch", "post", "delete"];
        dissalllowedMethods.map(method => {
          return request[method]("/api/users/user_name")
            .expect(405)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Method not allowed." });
            });
        });
        return Promise.all(dissalllowedMethods);
      });
    });
  });
  describe("/articles", () => {
    describe("/:article_id", () => {
      describe("GET", () => {
        it("Status 200: returns user data object when passed correct username as parametic", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.eql({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2018-11-15T12:21:54.171Z",
                comment_count: "13",
                votes: 100
              });
            });
        });
        it("Status 400: returns error when queried with non-integer value", () => {
          return request
            .get("/api/articles/twenty")
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Invalid input integer expected." });
            });
        });
        it("Status 404: returns error when article doesn't exist", () => {
          return request
            .get("/api/articles/999")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Article not found." });
            });
        });
      });
      describe("PATCH", () => {
        it("Status 200: returns an object containing the updated vote count incremented", () => {
          return request
            .patch("/api/articles/3")
            .send({ inc_votes: 999 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.eql({
                article_id: 3,
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                author: "icellusedkars",
                body: "some gifs",
                created_at: "2010-11-17T12:21:54.171Z",
                votes: 999
              });
            });
        });
        it("Status 200: returns an object containing the updated vote count decremented", () => {
          return request
            .patch("/api/articles/3")
            .send({ inc_votes: -999 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.eql({
                article_id: 3,
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                author: "icellusedkars",
                body: "some gifs",
                created_at: "2010-11-17T12:21:54.171Z",
                votes: -999
              });
            });
        });
        it("Status 400: returns error when queried with non-integer value", () => {
          return request
            .patch("/api/articles/twenty")
            .send({ inc_votes: 999 })
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Invalid input integer expected." });
            });
        });
        it("Status 400: returns error when passed an object without the correct key", () => {
          return request
            .patch("/api/articles/3")
            .send({ votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: "Bad request, invalid update object"
              });
            });
        });
        it("Status 400: returns error when passed an object with a non integer value", () => {
          return request
            .patch("/api/articles/3")
            .send({ inc_votes: "one hundred" })
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Invalid input integer expected." });
            });
        });
        it("Status 404: returns error when article doesn't exist", () => {
          return request
            .patch("/api/articles/999")
            .send({ inc_votes: 999 })
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Article not found." });
            });
        });
      });
      describe("/comments", () => {
        describe("POST", () => {
          it("Status 200: returns an object containing the posted comment", () => {
            return request
              .post("/api/articles/2/comments")
              .send({ username: "butter_bridge", body: "This is a test body." })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment).to.contain.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                );
                expect(body.comment.comment_id).to.equal(19);
                expect(body.comment.author).to.equal("butter_bridge");
              });
          });
          it("Status 400: returns error when passed an object without the correct keys", () => {
            return request
              .post("/api/articles/2/comments")
              .send({ username: "butter_bridge" })
              .expect(400)
              .then(({ body }) => {
                expect(body).to.eql({ msg: "Bad request , missing values" });
              });
          });
          it("Status 400: returns error when article id in path is invalid", () => {
            return request
              .post("/api/articles/two/comments")
              .send({ username: "butter_bridge", body: "This is a test body." })
              .expect(400)
              .then(({ body }) => {
                expect(body).to.eql({ msg: "Invalid input integer expected." });
              });
          });
          it("Status 404: returns error when the article doesn't exist", () => {
            return request
              .post("/api/articles/999/comments")
              .send({ username: "butter_bridge", body: "This is a test body." })
              .expect(404)
              .then(({ body }) => {
                expect(body).to.eql({
                  msg: "Bad request , references non-existent item"
                });
              });
          });
          it("Status 422: returns error when the username doesn't exist in users table", () => {
            return request
              .post("/api/articles/1/comments")
              .send({
                username: "fake_user123",
                body: "This is a test body."
              })
              .expect(422)
              .then(({ body }) => {
                expect(body).to.eql({
                  msg: "Unprocessable entity , references non-existent item"
                });
              });
          });
        });
        describe("GET", () => {
          it("Status 200: returns an array of comments relating to an article", () => {
            return request
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.have.length(13);
              });
          });
          it("Status 200: returns an array of comment objects with only the correct keys", () => {
            return request
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0]).to.have.keys(
                  "comment_id",
                  "votes",
                  "created_at",
                  "body",
                  "author"
                );
              });
          });
          it("Status 200: returns an object with an empty array when article has no comments", () => {
            return request
              .get("/api/articles/2/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.have.length(0);
              });
          });
          it("Status 200: returns an array of comments relating to an article sorted by created_at and descending by default", () => {
            return request
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("created_at");
              });
          });
          it("Status 200: returns an array of comments relating to an article sorted by created_at and and ascending", () => {
            return request
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.ascendingBy("created_at");
              });
          });
          it("Status 200: returns an array of comments relating to an article sorted by username and ascending", () => {
            return request
              .get("/api/articles/1/comments?sort_by=username&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.ascendingBy("author");
              });
          });
          it("Status 200: ignores invalid query type", () => {
            return request
              .get("/api/articles/1/comments?not_a_query=author")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.have.length(13);
              });
          });
          it("Status 400: returns an error when sort query is invalid", () => {
            return request
              .get("/api/articles/1/comments?sort_by=not_a_column")
              .expect(400)
              .then(({ body }) => {
                expect(body).to.eql({
                  msg: "Bad request , references an invalid column."
                });
              });
          });
          it("Status 404: returns an error when article doesn't exist", () => {
            return request
              .get("/api/articles/999/comments")
              .expect(404)
              .then(({ body }) => {
                expect(body).to.eql({
                  msg: "Article not found."
                });
              });
          });
        });
        describe("Disallowed Methods", () => {
          it("Status 405: returns method not allowed for all but get and post", () => {
            const dissalllowedMethods = ["patch", "delete"];
            dissalllowedMethods.map(method => {
              return request[method]("/api/articles/1/comments")
                .expect(405)
                .then(({ body }) => {
                  expect(body).to.eql({ msg: "Method not allowed." });
                });
            });
            return Promise.all(dissalllowedMethods);
          });
        });
      });
      describe("Disallowed Methods", () => {
        it("Status 405: returns method not allowed for all but get and patch", () => {
          const dissalllowedMethods = ["post", "delete"];
          dissalllowedMethods.map(method => {
            return request[method]("/api/articles/1")
              .expect(405)
              .then(({ body }) => {
                expect(body).to.eql({ msg: "Method not allowed." });
              });
          });
          return Promise.all(dissalllowedMethods);
        });
      });
    });
    describe("GET", () => {
      it("Status 200: returns an array of all articles", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.have.length(12);
          });
      });
      it("Status 200: returns an array of all articles sorted by created_at by default and descending", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("Status 200: returns an array of all articles sorted by title and descending", () => {
        return request
          .get("/api/articles?sort_by=title")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("title");
          });
      });
      it("Status 200: returns an array of all articles sorted by title and ascending", () => {
        return request
          .get("/api/articles?sort_by=title&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy("title");
          });
      });
      it("Status 200: returns an array of all articles filtered by author", () => {
        return request
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach(element => {
              expect(element.author).to.equal("butter_bridge");
            });
          });
      });
      it("Status 200: returns an array of all articles filtered by topic", () => {
        return request
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach(element => {
              expect(element.topic).to.equal("mitch");
            });
          });
      });
      it("Status 200: returns an array of objects with the correct keys", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach(element => {
              expect(element).to.have.keys(
                "article_id",
                "author",
                "body",
                "comment_count",
                "created_at",
                "title",
                "topic",
                "votes"
              );
            });
          });
      });
      it("Status 200: defaults to desc when given invlaid order query value", () => {
        return request
          .get("/api/articles?order=not_an_order")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("Status 200: returns an empty array when no articles exist for an author", () => {
        return request
          .get("/api/articles?author=lurker")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([]);
          });
      });
      it("Status 400: returns an error when sort query is invalid", () => {
        return request
          .get("/api/articles?sort_by=not_a_column")
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: "Bad request , references an invalid column."
            });
          });
      });
      it("Status 400: returns an error when sort query is invalid", () => {
        return request
          .get("/api/articles?sort_by=not_a_column")
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: "Bad request , references an invalid column."
            });
          });
      });
      it("Status 404: returns an error when filter topic doesn't exist", () => {
        return request
          .get("/api/articles?topic=motch&author=butter_bridge")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Article not found." });
          });
      });
      it("Status 404: returns an error when filter author doesn't exist", () => {
        return request
          .get("/api/articles?author=not_a_user")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: "Article not found."
            });
          });
      });
      it("Status 404: returns an error when topic filter query is invalid", () => {
        return request
          .get("/api/articles?topic=1000")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: "Article not found."
            });
          });
      });
    });
    describe("Disallowed Methods", () => {
      it("Status 405: returns method not allowed for all but get method", () => {
        const dissalllowedMethods = ["post", "patch", "delete"];
        dissalllowedMethods.map(method => {
          return request[method]("/api/articles")
            .expect(405)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Method not allowed." });
            });
        });
        return Promise.all(dissalllowedMethods);
      });
    });
  });
  describe("/comments", () => {
    describe("PATCH", () => {
      it("Status 200: increments vote by passed item", () => {
        return request
          .patch("/api/comments/3")
          .send({ inc_votes: 999 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.eql({
              article_id: 1,
              author: "icellusedkars",
              body:
                "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
              comment_id: 3,
              created_at: "2015-11-23T12:36:03.389Z",
              votes: 1099
            });
          });
      });
      it("Status 200: returns an object containing the updated vote count decremented", () => {
        return request
          .patch("/api/comments/3")
          .send({ inc_votes: -999 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.eql({
              article_id: 1,
              author: "icellusedkars",
              body:
                "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
              comment_id: 3,
              created_at: "2015-11-23T12:36:03.389Z",
              votes: -899
            });
          });
      });
      it("Status 400: returns error when route is non-integer value", () => {
        return request
          .patch("/api/comments/twenty")
          .send({ inc_votes: 999 })
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Invalid input integer expected." });
          });
      });
      it("Status 400: returns error when passed an object without the correct key", () => {
        return request
          .patch("/api/comments/3")
          .send({ votes: 1 })
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: "Bad request, invalid update object"
            });
          });
      });
      it("Status 400: returns error when passed an object with a non integer value", () => {
        return request
          .patch("/api/comments/3")
          .send({ inc_votes: "one hundred" })
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Invalid input integer expected." });
          });
      });
      it("Status 404: returns error when article doesn't exist", () => {
        return request
          .patch("/api/comments/999")
          .send({ inc_votes: 999 })
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Comment not found." });
          });
      });
    });
    describe("DELETE", () => {
      it("Status 204: deletes comment and sends 204 response", () => {
        return request
          .delete("/api/comments/1")
          .expect(204)
          .then(({ body }) => {
            expect(body).to.eql({});
          });
      });
      it("Status 400: returns error when comment number is invalid ", () => {
        return request
          .delete("/api/comments/two")
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Invalid input integer expected." });
          });
      });
      it("Status 404: returns error when comment doesn't exist", () => {
        return request
          .delete("/api/comments/999")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Comment not found." });
          });
      });
    });
    describe("Disallowed Methods", () => {
      it("Status 405: returns method not allowed for all but delete and patch methods", () => {
        const dissalllowedMethods = ["get", "post"];
        dissalllowedMethods.map(method => {
          return request[method]("/api/comments/1")
            .expect(405)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Method not allowed." });
            });
        });
        return Promise.all(dissalllowedMethods);
      });
    });
  });
});
