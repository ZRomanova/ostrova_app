const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports.create = async function(req, res) {
  try {
    // login password
    const candidate = await db.query('SELECT id FROM users WHERE username = $1;', [req.body.username])

    if (candidate.rowCount) {
      // Пользователь существует, нужно отправить ошибку
      res.status(409).json({
        message: 'Такой ник уже занят. Попробуйте войти.'
      })
    } else {
      // Нужно создать пользователя
      
      const salt = bcrypt.genSaltSync(10)
      const password = bcrypt.hashSync(req.body.password, salt)
      await db.query('INSERT INTO users (username, password) VALUES ($1, $2);', [req.body.username, password])

      res.status(200).json({
        message: `Пользователь создан, вы можете войти`
      })
    }
  } catch (e) {

  }
}

module.exports.login = async function(req, res) {
  try {
    let candidate = await db.query('SELECT id, password FROM users WHERE username = $1;', [req.body.username])

    if (candidate.rowCount) {
      candidate= candidate.rows[0]
      // Проверка пароля, пользователь существует
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

      if (passwordResult) {
        // Генерация токена, пароли совпали
        const token = jwt.sign({
          user_id: candidate.id
        }, keys.jwt, {expiresIn: 60 * 60 * 24})

        res.status(200).json({
          token: `Bearer ${token}`
        })
      } else {
        // Пароли не совпали
        res.status(401).json({
          message: 'Пароли не совпадают. Попробуйте снова.'
        })
      }
    } else {
      // Пользователя нет, ошибка
      res.status(404).json({
        message: 'Пользователь не найден.'
      })
    }
  } catch (e) {

  }
}