const jwt = require("jsonwebtoken");
// const { jw } = require("jsonwebtoken");

function getSauces(req, res) {
  const header = req.header("authorization");
  const token = header.split(" ")[1];

  if (header == null) return res.status(403).send({ message: "Invalid" });

  //   if (!token) {
  //     res.status(403).send({ message: "Invalid" });
  //   }
  if (token == null) return res.status(403).send({ message: "Token null" });

  jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) =>
    controlToken(err, decoded, res)
  );
  //   res.send({ message: "ok" });
  console.log("token:", token);
  //   console.log("decoded :", decoded);
}
function controlToken(err, decoded, res) {
  if (err) res.status(403).send({ message: "token invalide : " + err });
  else {
    console.log("le token a l'air bon", decoded);
    res.send({ message: "Array des sauces ! " });
  }
}

module.exports = { getSauces };
