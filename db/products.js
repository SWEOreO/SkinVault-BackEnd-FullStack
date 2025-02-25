const client = require('./client.js');

const createProducts = async(id, name, type, image, ingredients) => {
  try{
    await client.query(`
      INSERT INTO users (id, name, type, image, ingredients)
      VALUES ($1,$2,$3,$4, $5)
    `, [id, name, type, image, ingredients]);
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createProducts
}