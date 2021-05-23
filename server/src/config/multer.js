const multer = require("multer");
const path = require("path");
const moment = require("moment")

module.exports = {
  dest: path.resolve(__dirname, "..", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        file.key = `${moment().format('DD_MM_YYTHHMMSS')}-${file.originalname}`;
        cb(null, file.key);
        
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 * 1024 * 512
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagem não aceito."));
    }
  }
};