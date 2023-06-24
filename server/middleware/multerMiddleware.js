// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/uploads")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
//     if (allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// const uploadMiddleware = multer({
//     storage: storage,
//     limits: { fileSize: 5000000 },
//     fileFilter
// })


// module.exports = uploadMiddleware