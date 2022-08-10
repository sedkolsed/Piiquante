require("dotenv").config();
const express = require("express");
const { productsRouter } = require("./routers/routerSauce");
const { authRouter } = require("./routers/routerAuth");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

// Middlewares..............................................

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/sauces", productsRouter);
app.use("/api/auth", authRouter);

// Ecoute sur le port 3000............................................
app.use("/images", express.static("images"));
app.listen(port, () => {
  console.log("listening on port : " + port);
});
