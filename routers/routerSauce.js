const express = require("express");
const productsRouter = express.Router();
const { authentification } = require("../middleware/auth");

const {
  getSauces,
  createSauce,
  productById,
  deleteSauce,
  modifySauce,
} = require("../controllers/sauces");

const { upload } = require("../middleware/multer");

productsRouter.get("/", authentification, getSauces);
productsRouter.post("/", authentification, upload.single("image"), createSauce);
productsRouter.get("/:id", authentification, productById);
productsRouter.delete("/:id", authentification, deleteSauce);
productsRouter.put(
  "/:id",
  authentification,
  upload.single("image"),
  modifySauce
);

module.exports = { productsRouter };
