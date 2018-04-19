var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.use(router);



//log every request to the console for debugging purposes
app.all('*', function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});


//Start server
var port = 8000;
var server = app.listen(port, function(){
    console.log('Listening to server on port: ' + server.address().port);
});


//Database connection
//var dbUrl =  "mongodb://username:password@ip:port/tablename";

// mongoose.connect( dbUrl).then(
//     seccess => { console.log("Connected to: " + dbUrl)},
//     err => { console.log(err) }
// );



//Routes




module.exports = app;