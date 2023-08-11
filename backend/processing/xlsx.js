const reader = require('xlsx')

module.exports = (filepath) => {
  const file = reader.readFile(filepath)
    
  let data = []
    
  const sheets = file.SheetNames
    
  for(let i = 0; i < sheets.length; i++)
  {
    const temp = reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
        data.push(res)
    })
  }
  
  data = JSON.stringify(data)
  return data
}