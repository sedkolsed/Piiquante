console.log("j'y comprends tout ou rien !");

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// Middlewares..............................................

app.use(cors());
app.use(express.json());

// Routes.....................................................
app.post("/api/auth/signup", (req, res) => {
  console.log("signup request :", req.body);
  res.send({ message: "utilisateur enregistré" });
});

app.get("/", (req, res) => {
  res.send("coucou!");
});

app.listen(port, () => {
  console.log("listening on port : " + port);
});
