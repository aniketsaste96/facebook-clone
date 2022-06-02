const express = require("express");
const { register } = require("../controllers/user");
const rotuer = express.Router();

rotuer.post("/register", register)


module.exports = rotuer;