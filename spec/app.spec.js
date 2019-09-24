process.env.NODE_ENV = "test";

const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("Errors", () => {
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
              expect(body).to.eql({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: "2018-11-15T12:21:54.171Z",
                comment_count: 13,
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
              expect(body).to.eql({
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
              expect(body).to.eql({
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
  });
});
