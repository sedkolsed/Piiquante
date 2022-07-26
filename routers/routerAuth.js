const express = require("express");
const authRouter = express.Router();

const { createUser } = require("../controllers/users");
const { login } = require("../controllers/users");

authRouter.post("/signup", createUser);
authRouter.post("/login", login);

module.exports = { authRouter };
