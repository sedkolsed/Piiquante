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

// Accès sauces.................................................
function getSauces(req, res) {
  console.log("le token a l'air bon");
  productUser.find({}).then((products) => res.send(products));
  // res.send({ message: "Array des sauces ! " });
}

function createSauce(req, res) {
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;

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
