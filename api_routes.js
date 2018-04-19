const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({});


const UserAccount = require('./models/userAccount');

router.all('*', (req, res, next) = > {
    next();
})
;


//UserAccounts
router.post('/UserAccount', (req, res) = > {
    const userAccount = new UserAccount(req.body);
userAccount.save().then((data) = > {
    console.log("userAccount posted: " + userAccount);
res.status(200).json({'status': 'ok'});
}).
catch(error = > {
    console.log(error.toString());
res.status(500).json({"err": "server error while posting userAccount"})
})
;
})
;

router.get('/UserAccount', verifyToken, (req, res) = > {
    console.log('verifying token');
jwt.verify(req.token, 'verysecretkey', (err, authData) = > {
    console.log(req.token);
if (err) {
    console.log(err);
    res.status(403).json({'message': 'error 403 - no valid authentication token send'});
} else {
    const name = req.query.name;
    const limit = +req.query.limit || 0;

    // Build query
    let query = {};
    if (name) {
        query.name = name;
    }
    console.log(query);

    // Query using Mongoose Model
    UserAccount
        .find(query, {'_id': 0, 'username': 1, 'password': 1, 'isAdmin': 1, 'createdAt': 1})
        .limit(limit)
        .sort({createdAt: -1})
        .then(result = > {
        res.status(200).json(result);
}).catch(err = > {
        res.status(500).json({'message': 'an error occured while getting data: ' + err});
});
}
});
});

//Authentication
router.post('/authenticate', (req, res) = > {
    var username = req.body.UserName;
    var password = req.body.Password;

    UserData.findOne({UserName: username, Password: password}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).json({"err": err.toString()});
        }
        if (!user) {
            console.log("404, user not found");
            res.status(404).json({"not found": "user not found, cannot login"});
        }
        if (user) {
            console.log("user found, generating token");
            jwt.sign({user: user}, 'verysecretkey', (err, token) = > {
                res.json({
                token: token
                });
            });
        }
    })
});


//Verify user authetication Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        //no valid token found
        res.status(403).json({
            message: "no valid authorization token"
        });
    }
}

module.exports = router;