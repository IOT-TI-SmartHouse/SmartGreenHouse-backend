const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const router = express.Router();

const SensorNode = require("../models/sensorNode")
const GreenhouseDepartment = require("../models/greenhouseDepartment")

router.post("/register", verifyToken, (req, res) => {
    GreenhouseDepartment.canEdit(req.body.greenhouseDepartment, req.userId).then(
        () => {
            SensorNode.create({
                name:req.body.name,
                greenhouseDepartment:req.body.greenhouseDepartment,
                latitude:req.body.latitude,
                longitude:req.body.longitude
            }).then(
                node => res.status(200).send({id:node._id}),
                error => res.status(500).send("[SensorNode::register] error creating SensorNode : " + error)
            )
        }, 
        error => res.status(500).send("[SensorNode::register] error creating SensorNode : " + error)
    )
});

router.get("/getAll", verifyToken, (req, res) => {
    GreenhouseDepartment.canEdit(req.headers["greenhousedepartment"], req.userId).then(
        () => {
            SensorNode.find({greenhouseDepartment: req.headers["greenhousedepartment"]}, (error, nodes) => {
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
    GreenhouseDepartment.canEdit(req.body.greenhouseDepartment, req.userId).then(
        () => {
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
