const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api_routes = require("./api_routes");
const port = 3000;

//log every request to the console for debugging purposes
app.all("*", function(req, res, next) {
  console.log(req.method + " " + req.url);
  next();
});

//Start server
var server = app.listen(port, function() {
  console.log("Listening to server on port: " + port);
});
