const jwt = require("jsonwebtoken");
// fonction d'authentification............................................
function authentification(req, res, next) {
  const header = req.header("authorization");
  const token = header.split(" ")[1];

  if (header == null) return res.status(403).send({ message: "Invalid" });

  if (token == null) return res.status(403).send({ message: "Token null" });

  jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
    if (err)
      return res.status(403).send({ message: "token invalide : " + err });
    next();
  });
  //   res.send({ message: "ok" });
  console.log("token:", token);
  //   console.log("decoded :", decoded);
}
// Exportation des fonctions......................................................................
module.exports = { authentification };
