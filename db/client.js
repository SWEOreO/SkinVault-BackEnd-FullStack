// Client is a class from the pg (node-postgres) library used to connect to a PostgreSQL database.
const {Client} = require('pg');
//new Client(...) initializes a new database connection.
const client = new Client (process.env.DATABASE_URL || 'postgres://kayhsu@localhost:5432/skinvault');

module.exports = client;