const multer = require("multer");

const storage = multer.diskStorage({
  destination: "images/",
  filename: makeFilename,
});

function makeFilename(req, file, cb) {
  // const uniqueSuffix = Date.now + "-" + Math.round(Math.random() * 1e9);
  cb(null, Date.now() + "-" + file.originalname);
}
const upload = multer({ storage: storage });

module.exports = { upload };
