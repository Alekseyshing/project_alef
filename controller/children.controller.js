const db = require('../db')

class ChildrenController {
  
  async createChild(req, res) {
    const { user_id, full_name, age } = req.body;
    try {
        // Проверяем, существует ли пользователь с указанным user_id
        const userExists = await db.query('SELECT user_id FROM users WHERE user_id = $1', [user_id]);
        if (userExists.rows.length === 0) {
            return res.status(400).json({ error: 'Пользователь с указанным user_id не найден.' });
        }

        // Проверяем корректность введенного возраста (например, что он неотрицательный)
        // Проверяем, что не более 5 детей у пользователя
        const userChildrenCount = await db.query('SELECT COUNT(*) as count FROM children WHERE user_id = $1', [user_id]);
        if (userChildrenCount.rows[0].count >= 5) {
            return res.status(400).json({ error: 'Этот пользователь уже имеет максимальное количество детей.' });
        }
      
        const newChild = await db.query('INSERT INTO children (user_id, full_name, age) VALUES ($1, $2, $3) RETURNING *;', [user_id, full_name, age]);

        if (newChild.rows.length === 0) {
            return res.status(500).json({ error: 'Не удалось добавить ребенка.' });
        }

        res.json(newChild.rows[0]);
    } catch (error) {
        console.error('Error creating child:', error);
        res.status(500).json({ error: error.message });
    }
}

  async getChildrenByUser(req,res){
    const user_id = req.query.user_id
    const childrenByUser = await db.query('select * from children where user_id = $1', [user_id]);
    res.json(childrenByUser.rows)
  }
}

module.exports = new ChildrenController()

