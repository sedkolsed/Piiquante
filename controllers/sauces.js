const { json } = require("body-parser");
const mongoose = require("mongoose");
const { unlink } = require("fs");

//création du schéma de sauce.......................................
const productSchema = new mongoose.Schema({
  userId: String,
  name: String,
  manufacturer: String,
  description: String,
  mainPepper: String,
  imageUrl: String,
  heat: Number,
  likes: Number,
  dislikes: Number,
  usersLiked: [String],
  usersDisliked: [String],
});
const productUser = mongoose.model("product", productSchema);

// Accès sauces.................................................
function getSauces(req, res) {
  console.log("le token a l'air bon");
  productUser
    .find()
    .then((products) => res.send(products))
    .catch((error) => res.status(500).send(error));

  // res.send({ message: "Array des sauces ! " });
}
// Accès à une seule sauce.....................................
function productById(req, res) {
  console.log("ID:", req.params);
  const id = req.params.id;
  console.log(id);
  productUser
    .findById(id)
    .then((productUser) => {
      console.log(productUser);
      res.status(201).send(productUser);
    })
    .catch(console.error);
}
// Creation d'une sauce..........................................
function createSauce(req, res) {
  const sauce = JSON.parse(req.body.sauce);
  console.log("sauce: ", sauce);
  const name = sauce.name;
  const manufacturer = sauce.manufacturer;
  const description = sauce.description;
  const mainPepper = sauce.mainPepper;
  const heat = sauce.heat;
  const userId = sauce.userId;
  console.log("alors:", description);

  console.log({ body: req.body.sauce });
  console.log({ file: req.file });

  const imageName = req.file.filename;
  console.log("chemin:", imageName);
  const imageUrl =
    req.protocol + "://" + req.get("host") + "/images/" + imageName;
  console.log(imageUrl);

  const product = new productUser({
    userId: userId,
    name: name,
    manufacturer: manufacturer,
    description: description,
    mainPepper: mainPepper,
    imageUrl: imageUrl,
    heat: heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  product
    .save()
    .then((message) => {
      res.status(201).send({ message: message });
      return console.log("produit enregistré");
    })
    .catch(console.error);
}
// Supression d'une sauce...................................................
function deleteSauce(req, res) {
  const id = req.params.id;
  console.log(id);
  productUser
    .findByIdAndDelete(id)
    .then((product) => deleteImage(product))
    .then((product) => res.send({ message: "produit supprimé" }))
    .catch(console.error);
}

// Supression de l'image locale.....................
function deleteImage(product) {
  const imageUrl = product.imageUrl;
  const fileToDelete = imageUrl.split("/").at(-1);
  unlink(`images/${fileToDelete}`, (err) => {
    console.error("Problème suppression image", err);
  });
  return product;
}

// Exportation des fonctions......................................................................
module.exports = { getSauces, createSauce, productById, deleteSauce };
