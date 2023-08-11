const Router = require('express');
const router = new Router()
const controller = require('../controllers/users')

router.post('/login', controller.login)
router.post('/registr', controller.create)

module.exports = router;