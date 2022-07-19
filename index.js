require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

const { createUser } = require("./controllers/users");
const { login } = require("./controllers/users");
const { getSauces, createSauce } = require("./controllers/sauces");
// const path = require("path");

// Middlewares..............................................

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { authentification } = require("./middleware/auth");
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
// Routes.....................................................
app.post("/api/auth/signup", createUser);
app.post("/api/auth/login", login);
app.get("/api/sauces", authentification, getSauces);
app.post("/api/sauces", authentification, upload.single("image"), createSauce);

// Ecoute sur le port 3000............................................
app.use("/images", express.static("images"));
app.listen(port, () => {
  console.log("listening on port : " + port);
});
