const fs = require("fs");
const  PdfReader  = import("pdfreader");

module.exports.readPdf = (filepath) => {

   fs.readFile(filepath, (err, pdfBuffer) => {
     // pdfBuffer contains the file content
      PdfReader.parseBuffer(pdfBuffer, function(err, item){
        if (err)
            callback(err);
         else if (!item)
             callback();
          else if (item.text)
             console.log(item);
           });
        });
}