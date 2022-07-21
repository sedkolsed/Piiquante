require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

const { createUser } = require("./controllers/users");
const { login } = require("./controllers/users");
const {
  getSauces,
  createSauce,
  productById,
  deleteSauce,
} = require("./controllers/sauces");
const { upload } = require("./middleware/multer");
// const path = require("path");

// Middlewares..............................................

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { authentification } = require("./middleware/auth");

// Routes.....................................................
app.post("/api/auth/signup", createUser);
app.post("/api/auth/login", login);
app.get("/api/sauces", authentification, getSauces);
app.post("/api/sauces", authentification, upload.single("image"), createSauce);
app.get("/api/sauces/:id", authentification, productById);
app.delete("/api/sauces/:id", authentification, deleteSauce);

// Ecoute sur le port 3000............................................
app.use("/images", express.static("images"));
app.listen(port, () => {
  console.log("listening on port : " + port);
});
