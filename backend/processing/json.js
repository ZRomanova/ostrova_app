const fs = require('fs');
const path = require('path');

module.exports.readJson = (filepath) => {

  let data = require(filepath)

  data = JSON.stringify(data)
  return data
}


module.exports.writeJson = (filename, data) => {
  data = JSON.stringify(data, null, 2)

  let result_name = `${filename.split('.')[0]}.json`

  fs.writeFileSync(path.join(__dirname, 'downloads', result_name), data)

  return result_name
}