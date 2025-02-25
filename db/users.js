const client = require('./client.js');

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


module.exports = {
  createUsers
}