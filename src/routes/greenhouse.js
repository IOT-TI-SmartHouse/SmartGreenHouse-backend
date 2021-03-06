const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const User = require("../models/userAccount");
const Greenhouse = require("../models/greenhouse");
const GreenhouseDepartment = require("../models/greenhouseDepartment");
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
  const userId = req.headers["userid"];
  console.log(req.headers);
  if (userId) {
    console.log(userId)
    User.verifyAdmin(req.userId).then(
      user => {
        Greenhouse.all(userId).then(
          greenhouses => res.status(200).send({ user: userId, greenhouses: greenhouses }),
          err =>
            res
              .status(500)
              .send("[Greenhouse::getAll] error getting greenhouses : " + err)
        );
      },
      err =>
        res
          .status(500)
          .send("[Greenhouse::getAll] error getting greenhouses : " + err ? err : "no admin rights")
    );
  } else {
    Greenhouse.all(req.userId).then(
      greenhouses => res.status(200).send({ user: req.userId, greenhouses: greenhouses }),
      err =>
        res
          .status(500)
          .send("[Greenhouse::getAll] error getting greenhouses : " + err)
    );
  }
});

router.get("/getAllAccess", verifyToken, (req, res) => {
  const greenhouseId = req.headers["greenhouseid"];
  if (greenhouseId) {
    User.verifyAdmin(req.userId).then(
      user => {
        Greenhouse.allUser(req.userId, greenhouseId).then(
          users => res.status(200).send({ greenhouse: greenhouseId, users: users }),
          err =>
            res
              .status(500)
              .send("[Greenhouse::getAllAccess] error getting users : " + err)
        );
      },
      err =>
        res
          .status(500)
          .send("[Greenhouse::getAllAccess] error getting users : " + err ? err : "no admin rights")
    );
  } else {
    res
      .status(500)
      .send("[Greenhouse::getAllAccess] error getting greenhouses")
  }
});

router.post("/update", verifyToken, (req, res) => {
  User.verifyAdmin(req.userId).then(
    success => {
      Greenhouse.find({ _id: req.body.id }).update(
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
});

module.exports = router;
