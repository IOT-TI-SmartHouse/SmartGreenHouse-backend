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

//Database connection
if (!process.env.MONGO_PASSWORD || !process.env.MONGO_USERNAME) {
    console.error("Username / password for mongodb not defined! set credentials as environmental variable")
    process.exit()
}
const dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DATABASE}?authSource=admin`;
mongoose.connect(dbUrl).then(
  () => {
    console.log("MongoDB: Connected to: " + dbUrl);
  },
  err => {
    console.error(err);
  }
);

//Routes
app.use("/api", api_routes);

module.exports = app;
