const multer = require('multer');
const path = require('path');

const TEMP_DIR = path.resolve('temp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({ storage: multerConfig });

module.exports = { uploadMiddleware };
