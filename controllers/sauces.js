const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//création du schéma de sauce.......................................
const productSchema = new mongoose.Schema({
  userId: String,
  name: String,
  manufacturer: String,
  mainPepper: String,
  imageUrl: String,
  heat: Number,
  likes: Number,
  dislikes: Number,
  userLiked: [String],
  userDisliked: [String],
});
const productUser = mongoose.model("product", productSchema);

// function accès à la route get sauces............................................
function getSauces(req, res) {
  const header = req.header("authorization");
  const token = header.split(" ")[1];

  if (header == null) return res.status(403).send({ message: "Invalid" });

  if (token == null) return res.status(403).send({ message: "Token null" });

  jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) =>
    controlToken(err, decoded, res)
  );
  //   res.send({ message: "ok" });
  console.log("token:", token);
  //   console.log("decoded :", decoded);
}
// Contrôle de la validité du token et accès sauces.................................................
function controlToken(err, decoded, res) {
  if (err) res.status(403).send({ message: "token invalide : " + err });
  else {
    console.log("le token a l'air bon", decoded);
    productUser.find({}).then((products) => res.send(products));
    // res.send({ message: "Array des sauces ! " });
  }
}

function createSauce(req, res) {
  const product = new productUser({
    userId: "hello",
    name: "hello",
    manufacturer: "hello",
    mainPepper: "hello",
    imageUrl: "hello",
    heat: 333,
    likes: 333,
    dislikes: 333,
    userLiked: ["hello"],
    userDisliked: ["hello"],
  });
  product
    .save()
    .then(() => console.log("produit enregistré", res))
    .catch(console.error);
}

// Exportation des fonctions......................................................................
module.exports = { getSauces, createSauce };
