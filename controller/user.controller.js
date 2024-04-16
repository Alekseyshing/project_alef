const db = require('../db')
class UserController {
  async createUser(req,res){
    const {full_name, age} = req.body;
    const newUser = await db.query(`INSERT INTO users (full_name, age) VALUES ($1, $2) RETURNING *`, [full_name, age]);
    res.json(newUser.rows[0])
  }
  async getUsers(req,res){
    const users = await db.query('SELECT * FROM users')
    res.json(users.rows)
  }
  async getOneUser(req,res){
    const user_id = req.params.user_id
    const user = await db.query('SELECT * FROM users where user_id = $1', [user_id])
    res.json(user.rows[0])
  }
  async updateUser(req,res){
    const { user_id, full_name, age} = req.body

    const user = await db.query(`UPDATE users set full_name = $1, age = $2 where user_id = $3 RETURNING *`, 
    [full_name, age, user_id]
  )
    res.json(user.rows[0])
  }
  async deleteUser(req,res){
    const user_id = req.params.user_id
    const user = await db.query('DELETE FROM users where user_id = $1', [user_id])
    res.json(user.rows[0])
  }
}

module.exports = new UserController()