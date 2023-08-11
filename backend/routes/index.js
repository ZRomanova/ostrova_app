const express = require('express');
const router = express.Router();

router.use('/auth', require('./users'))
router.use('/', require('./files'))

module.exports = router;