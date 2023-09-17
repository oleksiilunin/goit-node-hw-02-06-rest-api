const multer = require("multer");
const path = require("node:path");
const crypto = require("node:crypto");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();
    const newFileName = `${basename}_${suffix}${extname}`;

    cb(
      null,
      newFileName
      // file.originalname
    );
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
