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
  const email = req.body.email;
  const password = req.body.password;
  const user = new User({ email: email, password: password });
  user
    .save()
    .then((res) => console.log("user enregistré", res))
    .catch(() => console.log("erreur base de données"));
  res.send({ message: "utilisateur enregistré" });
});

app.get("/", (req, res) => {
  res.send("coucou!");
});

app.listen(port, () => {
  console.log("listening on port : " + port);
});

//Database connection with mongoose.......................................
const mongoose = require("mongoose");
const password = "keXYejaKahrnAlS2";
const uri = `mongodb+srv://cedric:${password}@cluster0.t6ukz.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => console.log("connected to mongo!"))
  .catch(() => console.log("error connecting to mongo"));

// mongoose schema............................................................
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("user", userSchema);
