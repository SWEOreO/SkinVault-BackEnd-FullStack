const client = require('./client.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
require('dotenv').config()

const createReviews = async(score,text, user_id, product_id) => {
  try{
    const {rows} = await client.query(`
      INSERT INTO reviews (score,text, user_id, product_id)
      VALUES ($1,$2,$3,$4)
      RETURNING *;
    `, [score,text, user_id, product_id]);

    return rows[0];
  } catch(err) {
    console.log(err);
  }
}


const deleteReview = async(reviewId, user_id, product_id) => {
  try{
    const {rows} = await client.query(`
      DELETE FROM reviews 
      WHERE id = $1 and user_id = $2 and product_id = $3
      RETURNING *
      `, [reviewId,user_id,product_id]);

      if (rows[0]) {
        return rows[0];
      } else {
        throw Error({message:`review not found`});
      }
    
  } catch(err) {
    console.log(err);
  }
}


const fetchAllReviews = async(product_id) => {
  try {
    const { rows: retrievedReviews } = await client.query(`
      SELECT * FROM reviews WHERE product_id = ${product_id};
    `);

    return retrievedReviews;
  } catch(err) {
    console.log(err);
  }
}


const getMyReviews = async(reviewId, user_id) => {
  try {
    const { rows: retrievedReviews } = await client.query(`
      SELECT * FROM reviews WHERE id = ${reviewId} and user_id = ${user_id};
    `);

    return retrievedReviews;
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createReviews,
  fetchAllReviews,
  deleteReview, 
  getMyReviews
}