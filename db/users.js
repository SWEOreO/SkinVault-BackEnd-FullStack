const client = require('./client.js');
// enrich the password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUsers = async(uuid, username, password) => {
  try{
    const users = await client.query(`
      INSERT INTO users (id, username, password)
      VALUES ($1,$2,$3)
      RETURNING *
    `, [uuid,username,password]);
    console.log(users);
    return users.rows[0];
  } catch(err) {
    console.log(err);
  }
}

const registerUser = async(req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const userExists = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
        return res.status(400).json({ error: "User already exists!" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 5);

    // Insert the user into the database
    const newUser = await client.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!", user: newUser.rows[0] });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error!" });
}
};


const authenticateUser = async(username, password) => {
  try{
    const {rows} = await client.query(`
      SELECT * FROM users 
      WHERE username = ${username}  
    `);

    const user = rows[0];
    if (user){
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const token = await jwt.sign({username:user.username}, process.env.JWT_SECRET);
        return token;
      } else {
        throw new Error (`Bad Credentials`);
      }
      // console.log(passwordMatch); // Blean
    } else {
      throw Error(`Bad Credentials`);
    }
  } catch(err) {
    throw new Error(`Bad Credentials`);
  }
}


const logInWithToken = async(token) => {
  try {
    const usefulInfo = await jwt.verify(token, process.env.JWT_SECRET);

    const { rows } = await client.query(`
      SELECT * FROM users WHERE username='${usefulInfo.username}'
    `);

    const user = rows[0];

    if(user) {
      return { username: user.username };
    } else {
      return { message: 'Bad Token' }
    }
  } catch(err) {
    throw err;
  }
}

module.exports = {
  createUsers,
  authenticateUser,
  logInWithToken,
  registerUser
}