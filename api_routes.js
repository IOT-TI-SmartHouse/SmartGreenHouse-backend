const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({});


//const UserAccount = require('./models/userAccount');

router.all('*', (req, res, next) => {
    next();
});

module.exports = router;