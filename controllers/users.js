// const { User } = require("../mongo");

// function createUser(req, res) {
//   (req, res) => {
//     console.log("signup request :", req.body);
//     const email = req.body.email;
//     const password = req.body.password;
//     const user = new User({ email: email, password: password });
//     user
//       .save()
//       .then(() => res.send({ message: "utilisateur enregistré" }))
//       .catch(() => console.log("erreur base de données"));
//   };
// }

// module.exports = { createUser };
