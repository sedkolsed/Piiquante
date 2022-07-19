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
  const sauce = JSON.parse(req.body.sauce);
  console.log("sauce: ", sauce);
  const name = sauce.name;
  const manufacturer = sauce.manufacturer;
  const description = sauce.description;
  const mainPepper = sauce.mainPepper;
  const heat = sauce.heat;
  const userId = sauce.userId;

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
    userLiked: [],
    userDisliked: [],
  });
  product
    .save()
    .then(() => console.log("produit enregistré"))
    .catch(console.error);
}

// Exportation des fonctions......................................................................
module.exports = { getSauces, createSauce };
