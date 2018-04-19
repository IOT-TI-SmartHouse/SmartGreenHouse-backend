var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var api_routes = require('./api_routes');

const mongoose = require('mongoose');



//log every request to the console for debugging purposes
app.all('*', function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});


//Start server
var port = 3000;
var server = app.listen(port, function(){
    console.log('Listening to server on port: ' + server.address().port);
});


//Database connection
var username = process.env.MONGO_USERNAME;
var password = process.env.MONGO_PASSWORD;
console.log("username: " + username);
console.log("password: " + password);
var dbUrl =  "mongodb://" + username + ":" + password + "@178.62.247.98:27017/smartgreenhouse?authSource=admin";

mongoose.connect( dbUrl).then(
    seccess => { console.log("Connected to: " + dbUrl)},
    err => { console.log(err) }
);


//Routes
app.use('/api', api_routes);



module.exports = app;