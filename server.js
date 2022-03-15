const express = require("express");
const router = require("./routes/main");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app.use("/", router);
