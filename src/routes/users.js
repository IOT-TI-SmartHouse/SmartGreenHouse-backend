const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const fs = require('fs');

fs.readdir("../models", (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

const User = require('../models/UserAccount')
const verifyToken = require('../jwt/verifyToken')

const config = require('../../config')
const router = express.Router();

router.post('/register', verifyToken, function (req, res) {
  let requestedBy = req.userId;
  console.log(requestedBy);

  User.findById(requestedBy, function(err, user) {
      console.log(user);
      if(err){
          console.log(err);
          res.status(500).send("[User::register] error registering user : " + err);
      } else {
          console.log(user.isAdmin);
          if(user.isAdmin){
              console.log("this user has admin rights! " + user.username);

              const hashedPassword = bcrypt.hashSync(req.body.password, 8);
              const admin = req.body.isAdmin === undefined ? false: req.body.isAdmin;


              User.create({
                      username: req.body.username,
                      password: hashedPassword,
                      isAdmin: admin
                  },
                  (err, user) => {
                      if (err) {
                          console.log('[User::register] error registering user : ' + err);
                          return res.status(500).send("There was a problem registering the user.");
                      }
                      // create a token
                      const token = jwt.sign({ id: user._id }, config.Secret, {
                          expiresIn: 86400 // expires in 24 hours
                      });

                      res.status(200).send({ auth: true, token: token });
                  });
          } else {
              res.status(500).send("No admin rights provided, you can not register users");
          }
      }
  });


});

router.post('/login', function (req, res) {

  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    console.log(req.body.username);
    console.log(user);
    if (!user) return res.status(404).send('Error on the server.');

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, config.Secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  })
});

router.get('/me', verifyToken, (req, res) => {
  User.findById(req.userId,
    { password: 0 }, // projection
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
});

router.all('*', verifyToken, (req, res) => {
    res.status(500);
    res.json({});
});

module.exports = router;
