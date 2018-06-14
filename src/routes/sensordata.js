const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const router = express.Router();
const SensorNode = require("../models/sensorNode")
const Sensordata = require("../models/sensorData")

router.post("/register", verifyToken, (req, res) => {
    SensorNode.findOne({
        hardwareSerial: req.body.node
    }).then(
        node => {
            if (node) {
                console.log("Found:", node);
                data = {
                    node: node._id,
                    sensorType: req.body.sensorType,
                    value: req.body.value
                }
                Sensordata.create(data).then(
                    data => res.status(200).send({
                        id: data._id
                    }),
                    error => {
                        console.error(error);
                        console.log(data);
                        res.status(502).send("failed, cannot create data");
                    }
                )
            } else {
                console.log("Not found!")
                res.status(404).send("node not found");

            }
        },
        error => {
            console.error(error);
            res.status(502).send("failed, cannot search node");
        }
    );
});

router.get("/getAll", verifyToken, (req, res) => {
    SensorNode.canEdit(req.headers["node"], req.userId).then(
        () => {
            Sensordata.find({
                node: req.headers["node"]
            }).then(
                data => res.status(200).send({
                    data: data
                }),
                error => res.status(500).send("[Sensordata::getAll] error getting Sensordata : " + error)
            )
        },
        error => res.status(500).send("[Sensordata::getAll] error getting Sensordata : " + error)
    )

});

module.exports = router;