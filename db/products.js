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


const fetchAllProducts = async() => {
  try {
    const { rows: retrievedProducts } = await client.query(`
      SELECT * FROM products;
    `);

    return retrievedProducts;
  } catch(err) {
    console.log(err);
  }
}

const fetchProductDetails = async(product_id) => {
  try {
    const { rows: retrievedProductDetails } = await client.query(`
      SELECT * FROM products WHERE id = ${product_id};
    `);

    return retrievedProductDetails;
  } catch(err) {
    console.log(err);
  }
}



module.exports = {
  createProducts,
  fetchAllProducts,
  fetchProductDetails
}