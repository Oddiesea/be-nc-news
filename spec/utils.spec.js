const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array when passed one', () => {
    expect(formatDates([])).to.eql([]);
  });
  it('doesn\'t change the contents of the input array' , () => {
    const input = [{
      body: 'Test body.',
      belongs_to: 'Test Title',
      created_by: 'testUser',
      votes: -1,
      created_at: 1468087638932,
    },
    {
      body: 'Another test body.',
      belongs_to: 'Test Title 2',
      created_by: 'otherTestUser',
      votes: 7,
      created_at: 1478813209256,
    }]
    const inputCopy = [{
      body: 'Test body.',
      belongs_to: 'Test Title',
      created_by: 'testUser',
      votes: -1,
      created_at: 1468087638932,
    },
    {
      body: 'Another test body.',
      belongs_to: 'Test Title 2',
      created_by: 'otherTestUser',
      votes: 7,
      created_at: 1478813209256,
    }]
    formatDates(input);
    expect(input).to.eql(inputCopy)
  });
  it('doesn\'t reference any objects from the original array', () => {
    const input = [{
      body: 'Test body.',
      belongs_to: 'Test Title',
      created_by: 'testUser',
      votes: -1,
      created_at: 1468087638932,
    },
    {
      body: 'Another test body.',
      belongs_to: 'Test Title 2',
      created_by: 'otherTestUser',
      votes: 7,
      created_at: 1478813209256,
    }]
    expect(formatDates(input)[0]).to.not.equal(input[0])
    expect(formatDates(input)).to.not.equal(input)
  });
  it('returns an array of a single object with the date property re-formatted from a unix timestamp', () => {
    const input = [{
      body: 'Test body.',
      belongs_to: 'Test Title',
      created_by: 'testUser',
      votes: -1,
      created_at: 1468087638932,
    }]
    expect(formatDates(input)[0].created_at instanceof Date).to.equal(true);
  });
  it('returns an array of a several objects with the date property re-formatted from a unix timestamp', () => {
    const input = [{
      body: 'Test body.',
      belongs_to: 'Test Title',
      created_by: 'testUser',
      votes: -1,
      created_at: 1468087638932,
    }]
    const expected = [{
      body: 'Test body.',
      belongs_to: 'Test Title',
      created_by: 'testUser',
      votes: -1,
      created_at: new Date('2016-07-09T18:07:18.932Z')
    }]
    expect(formatDates(input)).to.eql(expected);
  });
});

describe.only("makeRefObj", () => {
  it("returns an empty object, when passed an empty array or missing args", () => {
    expect(makeRefObj([], "1", "2")).to.eql({});
    expect(makeRefObj([{ yo: "123" }])).to.eql({});
    expect(makeRefObj([{ yo: "123" }], "1")).to.eql({});
    expect(makeRefObj([{ yo: "123" }], "", "")).to.eql({});
  });
  it("returns an object with a different reference than the passed array", () => {
    const input = [];
    const actual = makeRefObj(input);
    expect(actual).to.not.equal(input);
  });
  it("doesn't change the contents of the original array", () => {
    const input = [{ hello: "123" }];
    const inputCopy = [{ hello: "123" }];
    makeRefObj(input, "hello", "1234");
    expect(input).to.eql(inputCopy);
  });
  it("returns a correctly formatted reference object", () => {
    const input = [
      {
        shop_name: "shop-b",
        owner: "firstname-b",
        slogan: "slogan-b",
        shop_id: 2
      }
    ];
    const actual = makeRefObj(input, "shop_name", "shop_id");
    const expected = { "shop-b": 2 };
    expect(actual).to.eql(expected);
  });
});

describe('formatComments', () => {});
