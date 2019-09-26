const dbConfig =
  ENV === 'production'
    ? { client: 'pg', connection: process.env.DATABASE_URL }
    : require('../knexfile');
    
const connection = require('knex')(dbConfig);


module.exports = connection