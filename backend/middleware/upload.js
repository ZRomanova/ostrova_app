const multer = require('multer')
const moment = require('moment')
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file,  cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    let name_arr = file.originalname.split('.')
    let mime = name_arr[name_arr.length - 1]
    cb(null, `${moment().format('YYYY-MMDD-HHmmss-SSS')}.${mime}`)
  }
})

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }

const limits = {
  fileSize: 1024 * 1024 * 5
}

module.exports = multer({storage, limits})