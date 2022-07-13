require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { User } = require("./mongo");

// Middlewares..............................................

app.use(cors());
app.use(express.json());

// Routes.....................................................
app.post("/api/auth/signup", (req, res) => {
  console.log("signup request :", req.body);
  const email = req.body.email;
  const password = req.body.password;
  // const hashedPassword = hashPassword(password);
  const user = new User({ email: email, password: password });
  user
    .save()
    .then((res) => console.log("user enregistré", res))
    .catch(() => console.log("erreur base de données"));
  res.send({ message: "utilisateur enregistré" });
});
// Fonction cryptage...................................................
// function hashedPassword(password) {
//   return "pouet";
// }

// Ecoute sur le port 3000............................................
app.listen(port, () => {
  console.log("listening on port : " + port);
});
