const connection = require('knex')(dbConfig);
const dbConfig =
  ENV === 'production'
    ? { client: 'pg', connection: process.env.DATABASE_URL }
    : require('../knexfile');


module.exports = connection