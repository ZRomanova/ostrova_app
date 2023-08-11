const db = require('../db')
const xlsx = require('../processing/xlsx')

module.exports.getData = async function(req, res) {
  try {
    const data = await db.query('SELECT * FROM uploads WHERE user_id = $1 ORDER BY created DESC;', [req.user.id])
    const files = data.rows

    res.status(200).json(files)
  } catch (e) {

  }
}

module.exports.uploadFile = async function(req, res) {
  try {

    // console.log(req.user)
    const data = await db.query(`INSERT INTO uploads (name, file_path, user_id) VALUES ($1, $2, $3) RETURNING id;`, [req.body.name, req.file.filename, req.user.id])

    let mime = req.file.filename.split('.')[1]
    let body 

    switch (mime) {
      case 'xlsx': 
        body = xlsx(req.file.path)
        break

      default:
        res.json({"message": "К сожалению, мы пока не умеем обрабатывать такой тип файла"})

    }
    
    if (body) {
      await db.query(`UPDATE uploads SET data = $2 WHERE id = $1;`, [data.rows[0].id, body])

      res.json({"message": "OK"})
    }
    
  } catch (e) {
    res.json(e)
  }
}

module.exports.uploadJson = async function(req, res) {
  try {

  } catch (e) {
    
  }
}




