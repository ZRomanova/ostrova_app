const fs = require('fs');

module.exports.deleteFile = (filename) => {

  fs.unlink(path.join(__dirname, 'downloads', filename), (err) => console.log(err))
}