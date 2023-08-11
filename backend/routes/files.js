const Router = require('express');
const router = new Router()
const passport = require('passport')
const controller = require('../controllers/files')
const upload = require('../middleware/upload')

router.get('/data', passport.authenticate('jwt', {session: false}), controller.getData)
// router.get('/data/:id', controller.getDataById)
router.post('/uploads', passport.authenticate('jwt', {session: false}), upload.single('file'), controller.uploadFile)
router.post('/data', passport.authenticate('jwt', {session: false}), controller.uploadJson)

module.exports = router;