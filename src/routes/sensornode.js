const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const router = express.Router();

const SensorNode = require("../models/sensorNode")
const GreenhouseDepartment = require("../models/greenhouseDepartment")

router.post("/register", verifyToken, (req, res) => {
    SensorNode.create({
        name:req.body.name,
        greenhouseDepartment:req.body.greenhouseDepartment,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    }).then(
        node => res.status(200).send({id:node._id}),
        error => res.status(500).send("[SensorNode::register] error creating SensorNode : " + error)
    )
});

router.get("/getAll", verifyToken, (req, res) => {
    GreenhouseDepartment.hasRights(req.headers["greenhouseDepartment"], req.userId).then(
        _ => {
            SensorNode.find({greenhouseDepartment: req.headers["greenhouseDepartment"]}, (error, nodes) => {
                if(error){
                    res.status(500).send("[SensorNode::getAll] error getting SensorNode : " + error)
                }else{
                    res.status(200).send({nodes:nodes})
                }
            })
        },
        error => res.status(500).send("[SensorNode::getAll] error getting SensorNode : " + error)
    )
});

router.post("/update", verifyToken, (req, res) => {
    GreenhouseDepartment.hasRights(req.body.greenhouseDepartment, req.userId).then(
        _ => {
            SensorNode.findByIdAndUpdate(req.body.id, {
                name:req.body.name,
                greenhouseDepartment:req.body.greenhouseDepartment,
                latitude:req.body.latitude,
                longitude:req.body.longitude
            }).then(
                node => res.status(200).send({id:node._id}),
                error => res.status(500).send("[SensorNode::update] error updating SensorNode : " + error)
            )
        },
        error => res.status(500).send("[SensorNode::update] error updating SensorNode : " + error)
    )

});

module.exports = router;
