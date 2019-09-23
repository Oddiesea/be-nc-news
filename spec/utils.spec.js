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
  it('returns an array of a single item with the date re-formatted from unix timestamp', () => {
    const input = [{
      body: 'Test body.',
      belongs_to: 'Test Title',
      created_by: 'testUser',
      votes: -1,
      created_at: 1468087638932,
    }]
    expect(formatDates(input).created_at).to.equal(input)
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
