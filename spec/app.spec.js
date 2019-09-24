process.env.NODE_ENV = "test";

const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../db/connection");

beforeEach(() => {
    connection.seed.run();
});
after(() => {
    connection.destroy();
});

describe('/api', () => {
    describe('/topics', () => {
        describe('GET', () => {
            it('Status 200: it returns the array of all topics', () => {
                request.get('api/topics').expect(200).then(({body})=> {
                    return expect(body.length).to.equal(3)
                })
            });
        });
    });
});