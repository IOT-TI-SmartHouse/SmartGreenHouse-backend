const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const router = express.Router();
const SensorNode = require("../models/sensorNode")
const Sensordata = require("../models/sensorData")

router.post("/register", verifyToken, (req, res) => {
    SensorNode.findById(req.body.node).then(
        node => {
            SensorNode.canEdit(node.greenhouseDepartment, req.userId).then(
                _ => {
                    Sensordata.create({
                        sensorType: req.body.sensorType,
                        value: req.body.value,
                        node: node._id
                    }).then(
                        data => res.status(200).send({id:data._id})
                    )
                },
                error => res.status(500).send("[Sensordata::register] error registering Sensordata : " + error)
            )
        },
        error => res.status(500).send("[Sensordata::register] error registering Sensordata : " + error)
    )
});

router.get("/getAll", verifyToken, (req, res) => {
    SensorNode.findById(req.body.node).then(
        node => {
            SensorNode.canEdit(node.greenhouseDepartment, req.userId).then(
                _ => {
                    Sensordata.find({node: node.id}).then(
                        data => res.status(200).send({data:data}),
                        error => res.status(500).send("[Sensordata::getAll] error getting Sensordata : " + error)
                    )
                },
                error => res.status(500).send("[Sensordata::getAll] error getting Sensordata : " + error)
            )
        },
        error => res.status(500).send("[Sensordata::getAll] error getting Sensordata : " + error)
    )
});

module.exports = router;
