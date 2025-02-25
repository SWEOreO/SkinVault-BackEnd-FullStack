const client = require('./client.js');

const createProducts = async(name, type, image, ingredients) => {
  try{
    await client.query(`
      INSERT INTO products (name, type, image, ingredients)
      VALUES ($1,$2,$3,$4)
    `, [name, type, image, ingredients]);
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createProducts
}