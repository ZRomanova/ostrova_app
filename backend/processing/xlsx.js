const reader = require('xlsx')

module.exports.readXlsx = (filepath) => {
  const file = reader.readFile(filepath)
    
  let data = []
    
  const sheets = file.SheetNames
    
  for(let i = 0; i < sheets.length; i++)
  {
    const temp = reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]])
      temp.forEach((res) => {
        res["Лист"] = 1 + i
        data.push(res)
    })
  }
  
  data = JSON.stringify(data)
  return data
}


// функция будет считывать названия столбцов, чтобы спросить пользователя тип
module.exports.readTitlesXlsx = (filepath) => {
  // const file = reader.readFile(filepath)
    
  // let data = []
    
  // const sheets = file.SheetNames
    
  // for(let i = 0; i < sheets.length; i++)
  // {
  //   const temp = reader.utils.sheet_to_json(
  //     Console.log(file.Sheets[file.SheetNames[i]]))

  //     // res = temp[0]
  //     // res["Лист"] = 1 + i
  //     // data.push(res) 
    
  // }
  
  // data = JSON.stringify(data)
  // return data
}