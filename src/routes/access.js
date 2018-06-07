const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const User = require("../models/userAccount");
const GreenhouseAccess = require("../models/greenhouseAccess");
const router = express.Router();

router.post("/register", verifyToken, function(req, res) {
  User.verifyAdmin(req.userId).then(
    () => {
      User.findById(req.body.user, (error, user) => {
        if (error) {
          res
            .status(500)
            .send(
              "[GreenhouseAccess::register] error registering access : " + error
            );
        } else {
          GreenhouseAccess.create({
            user: user._id,
            greenhouse: req.body.greenhouse
          }).then(
            success => res.status(200).send({ created: true }),
            error =>
              res
                .status(500)
                .send(
                  "[GreenhouseAccess::register] error registering access : " +
                    error
                )
          );
        }
      });
    },
    error =>
      res
        .status(500)
        .send(
          "[GreenhouseAccess::register] error registering access : " + error
            ? error
            : "no admin rights"
        )
  );
});
router.post("/delete", verifyToken, function(req, res) {
  User.verifyAdmin(req.userId).then(
    () => {
      if (req.body.id) {
        GreenhouseAccess.findByIdAndRemove(req.body.id, (error, _) => {
          if (error) {
            res
              .status(500)
              .send(
                "[GreenhouseAccess::delete] error deleting access : " + error
                  ? error
                  : "no admin rights"
              );
          } else {
            res.status(200).send({ deleted: true });
          }
        });
      } else if (req.body.user && req.body.greenhouse) {
        GreenhouseAccess.findOne(
          { greenhouse: req.body.greenhouse, user: req.body.user },
          (error, found) => {
            if (error) {
              console.log(error);
              res
                .status(500)
                .send(
                  "[GreenhouseAccess::delete] error deleting access : " + error
                    ? error
                    : "no admin rights"
                );
            } else {
              console.log(found);
              found.remove(function (error) {
                if(error){
                  console.log(error);
                  res
                    .status(500)
                    .send(
                      "[GreenhouseAccess::delete] error deleting access : " + error
                        ? error
                        : "no admin rights")

                } else {
                  res.status(200).send({ deleted: true });
                }
              });
            }
          }
        );
      } else {
        res.status(200).send({ deleted: false });
      }
    },
    error =>
      res
        .status(500)
        .send(
          "[GreenhouseAccess::delete] error deleting access : " + error
            ? error
            : "no admin rights"
        )
  );
});

module.exports = router;
