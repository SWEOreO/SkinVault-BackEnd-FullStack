const{fetchAllUsers} = require('./db/users.js');
const{fetchAllProducts, fetchProductDetails} = require('./db/products.js');
const{fetchAllReviews, createReviews, deleteReview, getMyReviews} = require('./db/reviews.js');

const express = require('express');
const app = express();


app.use(express.json());

// // test
// app.get('/', (req, res, next) => {
//   res.send(`WELCOME`);
// });

// register
app.post('/api/auth.register',async(req, res, next) => {
  try{

  } catch(err) {
    next(err);}
});


// login
app.post('/api/auth.login',async(req, res, next) => {
  try{

  } catch(err) {
    next(err);}
});


// user info
app.get('/api/auth.me',async(req, res, next) => {
  try{

  } catch(err) {
    next(err);}
});


// all product info
app.get('/api/products', async(req, res, next) => {
  try{
    const allProducts = await fetchAllProducts();
  } catch(err) {
    next(err);
  }
});


// certain product details
app.get('/api/products/:product_id', async(req, res, next) => {
  try{
    const productDetails = await fetchProductDetails();
  } catch(err) {
    next(err);
  }
});

// matched review for certain product
app.get('/api/product/:product_id/reviews', async(req, res, next) => {
  try{
    const allReviews = await fetchAllReviews();
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
