const { User } = require("../mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Fonction cryptage...................................................

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Fonction createUser...............................................

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
    .then(() => res.status(201).send({ message: "utilisateur enregistré" }))
    .catch((err) =>
      res.status(409).send({ message: "erreur base de données:" + err })
    );
}
// Fonction login........................................................

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    console.log("pass:", password);
    const passwordStatus = await bcrypt.compare(password, user.password);

    if (!passwordStatus) {
      res.status(403).send({ message: "mot de passe incorrect" });
    }
    const token = createToken(email);
    if (passwordStatus) {
      res.status(200).send({ userId: user._id, token: token });
    }
    console.log("user:", user);
    console.log("password status:", passwordStatus);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "erreur interne" });
  }
}
// création du token............................................................

function createToken(email) {
  const jwtPassword = process.env.JWT_PASSWORD;
  const token = jwt.sign({ email: email }, jwtPassword, { expiresIn: "4H" });
  console.log("token:", token);
  return token;
}
// exportation des fonctions......................................................
module.exports = { createUser, login };
