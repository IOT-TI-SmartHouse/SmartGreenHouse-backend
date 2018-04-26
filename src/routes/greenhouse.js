const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const User = require("../models/userAccount");
const Greenhouse = require("../models/greenhouse");
const GreenhouseDepartment = require("../models/greenhouseDepartment")
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

router.get("/getAll", verifyToken, (req, res) => {
  Greenhouse.all(req.userId).then(
    greenhouses => res.status(200).send({ greenhouses: greenhouses }),
    err =>
      res
        .status(500)
        .send("[Greenhouse::getAll] error getting greenhouses : " + err)
  );
});

router.post("/update", verifyToken, (req, res) => {
  User.verifyAdmin(req.userId).then(
    success => {
      Greenhouse.find({_id: req.body.id}).update(
        {
          name: req.body.name,
          location: req.body.location
        },
        (err, greenhouse) => {
          if (err) {
            res
              .status(500)
              .send(
                "[Greenhouse::register] error updating greenhouse : " + err
              );
          } else {
            res.status(200).send({ isUpdated: true });
          }
        }
      );
    },
    err => {
      res
        .status(500)
        .send("[Greenhouse::register] error updating greenhouse : " + err);
    }
  );
})

module.exports = router;
