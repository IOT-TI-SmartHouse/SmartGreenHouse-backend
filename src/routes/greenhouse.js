const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const User = require("../models/userAccount");
const Greenhouse = require("../models/greenhouse");
const router = express.Router();

router.post("/register", verifyToken, (req, res) => {
  User.verifyAdmin(req.userId).then(
    success => {
      Greenhouse.create(
        {
          name: req.body.name,
          location: req.body.location
        },
        (err, greenhouse) => {
          if (err) {
            res
              .status(500)
              .send(
                "[Greenhouse::register] error creating greenhouse : " + err
              );
          } else {
            res.status(200).send({ greenhouse: greenhouse._id });
          }
        }
      );
    },
    err => {
      res
        .status(500)
        .send("[Greenhouse::register] error registering greenhouse : " + err);
    }
  );
});

module.exports = router;
