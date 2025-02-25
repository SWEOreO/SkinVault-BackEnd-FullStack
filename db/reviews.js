const client = require('./client.js');

const createReviews = async(score,text, user_id, product_id) => {
  try{
    await client.query(`
      INSERT INTO reviews (score,text, user_id, product_id)
      VALUES ($1,$2,$3,$4)
    `, [score,text, user_id, product_id]);
  } catch(err) {
    console.log(err);
  }
}


const deleteReview = async(reviewId, user_id, product_id) => {
  try{
    const {rows} = await client.query(`
      DELETE FROM reservation 
      WHERE id = ${reviewId} and user_id = ${user_id} and product_id = ${product_id}
      RETURNING *`
      );

      if (rows[0]) {
        return rows[0];
      } else {
        throw Error({message:`review not found`});
      }
    
  } catch(err) {
    console.log(err);
  }
}


const fetchAllReviews = async(reviewId, product_id) => {
  try {
    const { rows: retrievedReviews } = await client.query(`
      SELECT * FROM reviews WHERE id = ${reviewId} and customer_id = ${product_id};
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