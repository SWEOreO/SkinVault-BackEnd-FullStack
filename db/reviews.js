const client = require('./client.js');

const createReviews = async(text, user_id, product_id) => {
  try{
    await client.query(`
      INSERT INTO reviews (text, user_id, product_id)
      VALUES ($1,$2,$3)
    `, [text, user_id, product_id]);
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createReviews
}