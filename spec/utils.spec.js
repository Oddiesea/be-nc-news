const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when passed one", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("doesn't change the contents of the input array", () => {
    const input = [
      {
        body: "Test body.",
        belongs_to: "Test Title",
        created_by: "testUser",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Another test body.",
        belongs_to: "Test Title 2",
        created_by: "otherTestUser",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const inputCopy = [
      {
        body: "Test body.",
        belongs_to: "Test Title",
        created_by: "testUser",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Another test body.",
        belongs_to: "Test Title 2",
        created_by: "otherTestUser",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    formatDates(input);
    expect(input).to.eql(inputCopy);
  });
  it("doesn't reference any objects from the original array", () => {
    const input = [
      {
        body: "Test body.",
        belongs_to: "Test Title",
        created_by: "testUser",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Another test body.",
        belongs_to: "Test Title 2",
        created_by: "otherTestUser",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    expect(formatDates(input)[0]).to.not.equal(input[0]);
    expect(formatDates(input)).to.not.equal(input);
  });
  it("returns an array of a single object with the date property re-formatted from a unix timestamp", () => {
    const input = [
      {
        body: "Test body.",
        belongs_to: "Test Title",
        created_by: "testUser",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    expect(formatDates(input)[0].created_at instanceof Date).to.equal(true);
  });
  it("returns an array of a several objects with the date property re-formatted from a unix timestamp", () => {
    const input = [
      {
        body: "Test body.",
        belongs_to: "Test Title",
        created_by: "testUser",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const expected = [
      {
        body: "Test body.",
        belongs_to: "Test Title",
        created_by: "testUser",
        votes: -1,
        created_at: new Date("2016-07-09T18:07:18.932Z")
      }
    ];
    expect(formatDates(input)).to.eql(expected);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns an object with a different reference than the passed array", () => {
    const input = [];
    const actual = makeRefObj(input);
    expect(actual).to.not.equal(input);
  });
  it("doesn't change the contents of the original array", () => {
    const input = [{ hello: "123" }];
    const inputCopy = [{ hello: "123" }];
    makeRefObj(input);
    expect(input).to.eql(inputCopy);
  });
  it("returns a correctly formatted reference object when passed a single object in an array", () => {
    const input = [
      {
        article_id: 2,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is a test body.",
        created_at: 1471522072389
      }
    ];
    const actual = makeRefObj(input);
    const expected = { "Running a Node App": 2 };
    expect(actual).to.eql(expected);
  });
  it("returns a correctly formatted reference object when passed a several objects in an array.", () => {
    const input = [
      {
        article_id: 2,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is a test body.",
        created_at: 1471522072389
      },
      {
        article_id: 20,
        title: "Test Title",
        topic: "testy",
        author: "testAuth",
        body: "This is a test body.",
        created_at: 1471522072389
      },
      {
        article_id: 10,
        title: "Another Test Title",
        topic: "coding",
        author: "jessjelly",
        body: "This is a test body.",
        created_at: 1471522072389
      }
    ];
    const actual = makeRefObj(input);
    const expected = {
      "Running a Node App": 2,
      "Test Title": 20,
      "Another Test Title": 10
    };
    expect(actual).to.eql(expected);
  });
});

describe.only("formatComments", () => {
  it("returns an empty array when passed an empty array or an empty articleRef object", () => {
    expect(formatComments([1, 2, 3], {})).to.eql([]);
    expect(formatComments([], { hello: 123 })).to.eql([]);
  });
  it("doesn't change the contents of the input array", () => {
    const input = [
      { belongs_to: "Test Title" },
      { belongs_to: "Test Title 2" }
    ];
    const inputCopy = [
      { belongs_to: "Test Title" },
      { belongs_to: "Test Title 2" }
    ];
    const refObj = { "Test Title": 2, "Test Title 2": 21 };
    formatComments(input, refObj);
    expect(input).to.eql(inputCopy);
  });
  it("doesn't reference any objects from the original array", () => {
    const input = [
      { belongs_to: "Test Title" },
      { belongs_to: "Test Title 2" }
    ];
    const refObj = { "Test Title": 2, "Test Title 2": 21 };
    const actual = formatComments(input, refObj);
    expect(actual[0]).to.not.equal(input[0]);
    expect(actual[1]).to.not.equal(input[1]);
  });
  it("returns an array with the 'belongs_to' property properly changed when passed a single object in a array", () => {
    const input = [
      { belongs_to: "Test Title" },
    ];
    const refObj = { "Test Title": 2};
    const actual = formatComments(input, refObj);
    const expected = [{ article_id: 2}]
    expect(actual).to.eql(expected);
  });
  it('passes the same test as above with serval objects in an array', () => {
    const input = [
      { belongs_to: "Test Title" },{belongs_to: "Test Title 2"},{belongs_to: "Test Title 3"}
    ];
    const refObj = { "Test Title": 2,"Test Title 2":10,"Test Title 3": 20};
    const actual = formatComments(input, refObj);
    const expected = [{ article_id: 2}, {article_id:10}, {article_id:20},]
    expect(actual).to.eql(expected);
  });
  it("also replaces the 'created_by' key with the authour key and copies the value", () => {
    const input = [
      { belongs_to: "Test Title", 
    created_by: "Test author" },{belongs_to: "Test Title 2",created_by: "Test author 2" },{belongs_to: "Test Title 3",created_by: "Test author 3" }
    ];
    const refObj = { "Test Title": 2,"Test Title 2":10,"Test Title 3": 20};
    const actual = formatComments(input, refObj);
    const expected = [{ article_id: 2, author: "Test author"}, {article_id:10, author: "Test author 2"}, {article_id:20, author: "Test author 3"},]
    expect(actual).to.eql(expected);
  });
});
