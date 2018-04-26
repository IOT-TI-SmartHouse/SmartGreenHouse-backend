const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const User = require("../models/userAccount");
const GreenhouseDepartment = require("../models/greenhouseDepartment");
const Greenhouse = require("../models/greenhouse")
const router = express.Router();

router.post("/register", verifyToken, function(req, res) {
  User.verifyAdmin(req.userId).then(
    _ => {
        Greenhouse.findById(req.body.greenhouse, (error, greenhouse) => {
            if (error) {
            res
                .status(500)
                .send(
                "[GreenhouseDepartment::register] error registering department : " + error
                );
            } else {
                GreenhouseDepartment.create({
                    greenhouse: greenhouse._id,
                    name: req.body.name
                }).then(
                    department => res.status(200).send({ created: true, id:department._id }),
                    error =>
                    res
                        .status(500)
                        .send(
                        "[GreenhouseDepartment::register] error registering department : " +
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
          "[GreenhouseDepartment::register] error registering department : " + error
            ? error
            : "no admin rights"
        )
  );
});
router.post("/delete", verifyToken, function(req, res) {
  User.verifyAdmin(req.userId).then(
    _ => {
      if (req.body.id) {
        GreenhouseDepartment.findByIdAndUpdate(req.body.id, {active: false}, (error, _) => {
          if (error) {
            res
              .status(500)
              .send(
                "[GreenhouseDepartment::delete] error deleting access : " + error
                  ? error
                  : "no admin rights"
              );
          } else {
            res.status(200).send({ deleted: true });
          }
        });
      } else {
        res.status(200).send({ deleted: false });
      }
    },
    error =>
      res
        .status(500)
        .send(
          "[GreenhouseDepartment::delete] error deleting department : " + error
            ? error
            : "no admin rights"
        )
  );
});


router.get("/getAll", verifyToken, (req, res) => {
    GreenhouseDepartment.all(req.userId, req.headers["greenhouse"]).then(
        greenhouses => res.status(200).send({ departments: greenhouses }),
        err =>
          res
            .status(500)
            .send("[GreenhouseDepartment::getAll] error getting departments : " + err)
      );
  });

module.exports = router;
