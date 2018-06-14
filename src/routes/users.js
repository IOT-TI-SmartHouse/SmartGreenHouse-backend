const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userAccount");
const verifyToken = require("../jwt/verifyToken");

const config = require("../../config");
const router = express.Router();

User.create(
{
  username: "Admin",
  password: bcrypt.hashSync("password", 8),
  isAdmin: true
});

router.post("/register", verifyToken, function(req, res) {
  User.verifyAdmin(req.userId).then(
    success => {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const admin = req.body.isAdmin === undefined ? false : req.body.isAdmin;

      User.create(
        {
          username: req.body.username,
          password: hashedPassword,
          isAdmin: admin
        },
        (err, user) => {
          if (err) {
            console.log("[User::register] error registering user : " + err);
            return res
              .status(500)
              .send("There was a problem registering the user.");
          }
          // create a token
          const token = jwt.sign({ id: user._id }, config.Secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          res.status(200).send({ auth: true, token: token });
        }
      );
    },
    err => {
      res.status(500).send("[User::register] error registering user : " + err);
    }
  );
});

router.post("/login", function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("Error on the server.");

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, config.Secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token, isAdmin:user.isAdmin});
  });
});

router.get("/me", verifyToken, (req, res) => {
  User.findById(
    req.userId,
    { password: 0 }, // projection
    function(err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    }
  );
});

router.get("/getAll", verifyToken, (req, res) => {
  User.verifyAdmin(req.userId).then(
    user => {
      const user_projection = {
        __v: false,
        password: false,
        updatedAt: false
      }
      User.find({}, user_projection).then(users => {
        return res.status(200).send({success: true, users: users})
      },
      error => {
        console.error(error)
        return res.status(500).send("Error in getting all users");
      })
    },
    err =>
      res
        .status(500)
        .send("[Users::getAll] error getting users : " + err ? err : "no admin rights")
  );
})

module.exports = router;
