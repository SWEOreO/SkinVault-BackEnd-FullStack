const client = require('./client.js');

const createUsers = async(uuid, username, password) => {
  try{
    await client.query(`
      INSERT INTO users (id, username, password)
      VALUES ($1,$2,$3)
    `, [uuid,username,password]);
  } catch(err) {
    console.log(err);
  }
}


module.exports = {
  createUsers
}