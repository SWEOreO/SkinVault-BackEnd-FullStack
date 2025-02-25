// import client
const client = require('./client.js');
const {v4: uuidv4} = require('uuid');

// drop tables
const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
  } catch(err) {
    console.log(err);
  }
}

// create tables
const createTables = async() => {
  try{
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(30) NOT NULL,
        image TEXT,
        ingredients TEXT
      );

      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(60) NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        text TEXT,
        user_id UUID REFERENCES users(id) NOT NULL,
        product_id INTEGER REFERENCES products(id) NOT NULL
      );
    `);
  } catch(err) {
    console.log(err);
  }
}


const syncAndSeed = async() => {
  // connect to db
  await client.connect();
  console.log(`CONNECTED TO THE DB`);

  // drop the table
  console.log(`DROPPING TABLES`);
  await dropTables();
  console.log(`TABLE DROPPED`);

  // create tables
  console.log('CREATING TABLES');
  await createTables();
  console.log('TABLES CREATED');

  // create data
  // users
  
  // products
  // reviews

  // disconnect to db
  await client.end();
  console.log(`DISCONNECTED TO THE DB`);
}

syncAndSeed();