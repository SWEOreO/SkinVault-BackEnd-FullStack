const client = require('./client.js');

const createReviews = async(id, text, user_id, product_id) => {
  try{
    await client.query(`
      INSERT INTO users (id, text, user_id, product_id)
      VALUES ($1,$2,$3,$4)
    `, [id, text, user_id, product_id]);
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createReviews
}