const client = require('./client.js');
// enrich the password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
require('dotenv').config();

const createUsers = async(uuid, username, password) => {
  try{
    const users = await client.query(`
      INSERT INTO users (id, username, password)
      VALUES ($1,$2,$3)
      RETURNING *
    `, [uuid,username,password]);
    return users.rows[0];
  } catch(err) {
    console.log(err);
  }
}


const registerUser = async(username, password) => {
  try{
    const {rows: user} = await client.query(`
      SELECT * FROM users 
      WHERE username='${username}'  
    `);
  
    if (user.length > 0){
      throw Error(`User Already Exists!`);
      // console.log(passwordMatch); // Blean
    } else {
    const bcryptedPassword = await bcrypt.password
    const newUser = await createUsers(uuidv4(), username, bcryptedPassword);
    // const newUser = await createUsers(uuidv4(), username, password);
    console.log(newUser);
    console.log(process.env.JWT_SECRET);
    const token = await jwt.sign({username:newUser.username}, process.env.JWT_SECRET);

    return { message: "User registered successfully!", token };
    }
  } catch(err) {
    console.log(err);
    throw new Error(`Bad Credentials`);
  }
}


const logInUser = async(username, password) => {
  try {
    // const usefulInfo = await jwt.verify(token, process.env.JWT_SECRET);
    
    const { rows } = await client.query(`
      SELECT * FROM users WHERE username='${username}'
      `);
      
      const user = rows[0];
    
      if(user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          const token = await jwt.sign({username:user.username}, process.env.JWT_SECRET);
          
          return token;
        } else {
          throw new Error (`Bad Credentials`);
        }
      } else {
        return { message: 'Bad Token' }
      }
    } catch(err) {
      throw err;
  }
}


module.exports = {
  createUsers,
  logInUser,
  registerUser
}