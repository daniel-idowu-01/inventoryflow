const express = require("express");
const app = express();
const auth = require("../controller/auth");

app.post("/", auth.signUp)

app.post("/login", auth.login)

module.exports = app;
