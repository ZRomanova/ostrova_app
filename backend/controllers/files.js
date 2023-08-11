const path = require('path');
const db = require('../db')
const xlsxModule = require('../processing/xlsx')
const jsonModule = require('../processing/json')

module.exports.getData = async function(req, res) {
  try {
    const data = await db.query('SELECT id, file_path, name, created FROM uploads WHERE user_id = $1 ORDER BY created DESC;', [req.user.id])
    const files = data.rows

    res.status(200).json(files)
  } catch (e) {

  }
}

module.exports.uploadFile = async function(req, res) {
  try {

    const data = await db.query(`INSERT INTO uploads (name, file_path, user_id) VALUES ($1, $2, $3) RETURNING id;`, [req.body.name, req.file.filename, req.user.id])

    let mime = req.file.filename.split('.')[1]
    let body 

    switch (mime) {
      case 'xlsx': 
        body = xlsxModule.readXlsx(req.file.path)
        break
      case 'json':
        body = jsonModule.readJson(req.file.path)
        break

      default:
        res.json({"message": "К сожалению, мы пока не умеем обрабатывать такой тип файла"})

    }
    
    if (body) {
      let file = await db.query(`UPDATE uploads SET data = $2 WHERE id = $1 RETURNING id, name, file_path, created;`, [data.rows[0].id, body])

      console.log(file)
      res.status(201).json(file.rows[0])
    }
    
  } catch (e) {
    res.json(e)
  }
}

module.exports.download = async function(req, res) {
  try {
x
    res.json({"message": "OK"})
    return

    const type = String(req.query.type).toLocaleLowerCase()

    const data = await db.query('SELECT data, file_path FROM uploads WHERE id = $1;', [+req.params.id])


    let json_data

    if (data && data.rowCount) json_data = data.rows[0]

    let filename

    switch (type) {
      case 'json':
        filename = jsonModule.writeJson(json_data.file_path, json_data.data)
        break
    }


    // console.log(filename)

  } catch (e) {
    console.log(e)
  }
}

module.exports.uploadUrl= async function(req, res) {
  try {

  } catch (e) {
    
  }
}




