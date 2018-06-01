const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const router = express.Router();
const SensorNode = require("../models/sensorNode")
const Sensordata = require("../models/sensorData")

router.post("/register", verifyToken, (req, res) => {
    SensorNode.find({hardwareSerial: req.body.node}).then(
        node => {
            SensorNode.canEdit(node._id, req.userId).then(
                () => {
                    Sensordata.create({
                        sensorType: req.body.sensorType,
                        value: req.body.value,
                        node: node._id
                    }).then(
                        data => res.status(200).send({id:data._id}),
                        error => {
                            console.error(error);
                            res.status(502).send("failed, cannot search node");
                        }
                    )
                },
                error => {
                    console.error(error);
                    res.status(502).send("failed, cannot edit");
                }
            )
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
            Sensordata.find({node: req.headers["node"]}).then(
                data => res.status(200).send({data:data}),
                error => res.status(500).send("[Sensordata::getAll] error getting Sensordata : " + error)
            )
        },
        error => res.status(500).send("[Sensordata::getAll] error getting Sensordata : " + error)
    )

});

module.exports = router;
