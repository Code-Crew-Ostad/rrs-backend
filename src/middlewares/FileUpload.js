const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

module.exports = (req, res)=>{
    var storage = multer.diskStorage({ 
        destination: (req, file, cb) => { 
            cb(null, 'uploads/') 
        }, 
        filename: (req, file, cb) => { 
            //cb(null, file.fieldname + '-' + Date.now()) 
            cb(null, Date.now()+file.originalname) 
        } 
    }); 
      const upload = multer({ storage: storage });
      return upload;
}

