//Database connection with mongoose.......................................
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const password = process.env.DB_PASSWORD;
const userName = process.env.DB_USERNAME;
const uri = `mongodb+srv://${userName}:${password}@cluster0.t6ukz.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => console.log("connected to mongo!"))
  .catch(() => console.log("error connecting to mongo"));

// mongoose userSchema............................................................
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model("user", userSchema);

module.exports = { User, mongoose };
