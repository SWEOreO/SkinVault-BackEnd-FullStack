const {registerUser, logInUser} = require('./db/users.js');
const{fetchAllProducts, fetchProductDetails} = require('./db/products.js');
const{fetchAllReviews, createReviews, deleteReview, getMyReviews} = require('./db/reviews.js');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('dist'));

const bcrypt = require('bcrypt');
const client = require('./db/client.js');
client.connect();

require('dotenv').config();

// // test
// app.get('/', (req, res, next) => {
//   res.send(`WELCOME`);
// });

// register
app.post('/api/auth/register',async(req, res, next) => {
  const{username, password} = req.body;
  try {
    const regUser = await registerUser(username, password);
    console.log(regUser);
    res.send(regUser);
  } catch (err) {
    res.send({message: `Bad Credentials`});
  }
});


// login
app.post('/api/auth/login',async(req, res, next) => {
  const{username, password} = req.body;
  try {
    const user = await logInUser(username, password);
    console.log(user);
    res.send({user})
  } catch (err) {
    res.send({message: err.message});
  }
});


// user info
app.get('/api/auth/me',async(req, res, next) => {
  try{
    const user = await registerUser(req.headers.logInUser);
    res.send({user})
  } catch(err) {
    res.send({message: err.message});
  }
});


// all product info
app.get('/api/products', async(req, res, next) => {
  try{
    const allProducts = await fetchAllProducts();
    res.send(allProducts);
  } catch(err) {
    next(err);
  }
});


// certain product details
app.get('/api/products/:product_id', async(req, res, next) => {
  const {product_id} = req.params;
  try{
    const productDetails = await fetchProductDetails(product_id);
    res.send(productDetails);
  } catch(err) {
    next(err);
  }
});


// matched review for certain product
app.get('/api/product/:product_id/reviews', async(req, res, next) => {
  const {product_id} = req.params;
  try{
    const allReviews = await fetchAllReviews(product_id);
    res.send(allReviews);
  } catch(err) {
    next(err);
  }
});

// create new reviews for cetain product(member only)
app.post('/api/products/:productId/write-new-reviews', async(req, res, next) => {
  const {productId} = req.params;
  console.log(productId);
  // console.log(id);
  const{score,text, user_id, product_id} = req.body;

  try{
    const newReview = await createReviews(score, text, user_id, product_id);
  }catch(err) {
    next(err);
  }
  res.status(201).send(newReview);
});

// delete existing review for certain product (member only)
app.delete('/api/reviews/:reviewId', async(req, res, next) => {
  const {reviewId} = req.params;
  console.log(reviewId);
  try{

    await deleteReview(reviewId);

    res.status(204).send({});
  } catch(err) {
    next(err);
  }
});


// check my reviews (members only)
app.get('/api/review/me', async(req, res, next) => {
  try{

    await getMyReviews(user_id);

    res.status(204).send({});
  } catch(err) {
    next(err);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
