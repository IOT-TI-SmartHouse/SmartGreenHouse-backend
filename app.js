const user = require('./src/routes/users')
const lora = require('./src/routes/lora')
const greenHouse = require('./src/routes/greenhouse')
const greenHouseAccess = require('./src/routes/access')
const greenHouseDepartment = require('./src/routes/department')
const sensorNode = require('./src/routes/sensornode')
const sensorData = require('./src/routes/sensordata')

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const repository = require('./src/repository/repository')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
repository.connect();

// Allow cross origin requests
// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     next();
//   });

app.use('/user', user);
app.use('/node', lora);
app.use('/greenhouse', greenHouse);
app.use('/greenhouseaccess', greenHouseAccess);
app.use('/greenhousedepartment', greenHouseDepartment);
app.use('/sensornode', sensorNode);
app.use('/sensordata', sensorData);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


