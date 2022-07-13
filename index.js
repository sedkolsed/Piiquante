require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { User } = require("./mongo");
const bcrypt = require("bcrypt");

// Middlewares..............................................

app.use(cors());
app.use(express.json());

// Routes.....................................................
app.post("/api/auth/signup", createUser);
app.post("api/auth/login", login);
// Fonction cryptage...................................................
function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}
// Ecoute sur le port 3000............................................
app.listen(port, () => {
  console.log("listening on port : " + port);
});
// Function createUser...............................................

async function createUser(req, res) {
  console.log("signup request :", req.body);
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await hashPassword(password);

  console.log("password:", password);
  console.log("hashedPassword:", hashedPassword);

  const user = new User({ email: email, password: hashedPassword });
  user
    .save()
    .then((res) => console.log("user enregistré", res))
    .catch(() => console.log("erreur base de données"));
  res.send({ message: "utilisateur enregistré" });
}
// Function login........................................................
function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
}
