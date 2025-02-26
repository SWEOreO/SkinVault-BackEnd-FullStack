const {registerUser, logInUser, existingUserInfo} = require('./db/users.js');
const{fetchAllProducts, fetchProductDetails} = require('./db/products.js');
const{fetchAllReviews, createReviews, deleteReview, getMyReviews} = require('./db/reviews.js');

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

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

const verifyToken = async(req,res,next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET,async (err,decoded)=> {
    if (err) {
      console.log(err);
      return res.status(401).send("unauthorized");
    } 
    const user = await existingUserInfo(token);
    decoded.user =user;
    req.user = decoded; 
    next();
  });
 
}

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
app.get('/api/auth/me',verifyToken, async(req, res, next) => {
  console.log(req.user)
  try{
    // const token = req.headers.authorization;
    // const user = await existingUserInfo(token);
    res.status(201).send(req.user);
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
app.post('/api/products/:product_id/write-new-reviews', verifyToken, async(req, res, next) => {
  const {product_id} = req.params;
  console.log(product_id);
  
  try{
    const{score,text} = req.body;
    
    if (!product_id || !text || !score) {
      return res.status(400).json({error: "All fields are required!"});
    }

    const user_id = req.user.user.id;
    const newReview = await createReviews(score, text, user_id, product_id);

    res.status(201).json({message: "Reveiw created successfullt!!!", newReview});
  
  }catch(err) {
    console.log(err);
    res.status(500).json({error: "Server error"});
  }
});

// delete existing review for certain product (member only)
app.delete('/api/reviews/:reviewId', verifyToken, async(req, res, next) => {
  const {reviewId} = req.params;
  console.log("Deleting Review ID:",reviewId);
  try{

    const deletedReview = await deleteReview(reviewId);

    if (!deletedReview) {
      return res.status(404).json({error: "Review not found!"});
    }

    res.status(204).send();
  } catch(err) {
    next(err);
  }
});


// check my reviews (members only)
app.get('/api/review/me', verifyToken, async(req, res, next) => {
  try{
    const user_id = req.user.user.id;
    const userReviews = await getMyReviews(user_id);

    if (userReviews.length === 0) {
      return res.status(404).json({message:"No reviews found!"});
    }

    res.status(200).json(userReviews);
  } catch(err) {
    next(err);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
