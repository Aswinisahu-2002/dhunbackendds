// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+"_"+file.originalname)
//     }
// })

// const fileFilter = (req,file,cb)=>{
//     const allowedFiles = ["audio/mp3","audio/mpeg"]
//     console.log(file.mimetype)
//     if(allowedFiles.includes(file.mimetype)){
//         cb(null,true)
//     }else{
//         cb(new Error("Invalid file format"),false)
//     }
// }

// const uploader = multer({
//     storage,
//     fileFilter,
//     limits:{fileSize:5*1024*1024} //5mb size
// })

// module.exports = uploader


const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedAudio = ["audio/mpeg", "audio/mp3"];
    const allowedImage = ["image/jpeg", "image/png", "image/jpg"];

    if (file.fieldname === "mysong" && allowedAudio.includes(file.mimetype)) {
        cb(null, true);
    } else if (file.fieldname === "cover" && allowedImage.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const uploader = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

module.exports = uploader;
