const express = require('express');
const verifyToken = require('../jwt/verifyToken')

const SensorNode = require("../models/sensorNode")
const SensorData = require("../models/sensorData")
const router = express.Router();

router.post('/lora/uplink', verifyToken, (req, res) => {
  const payload = req.body.payload_fields;
  const hardwareId = req.body.hardware_serial;

  console.log("connected by: "+ hardwareId)

  SensorNode.findOne({hardwareSerial: hardwareId}, (error, node) => {
    if(error || !node){
      res.status(500).send("Serial/node not found!");
      console.log("Node " + hardwareId + " not found!")
    }else {
      for(var item in payload) {
        console.log("Received data", item, payload[item])
        SensorData.create({
          sensorType: item,
          value: payload[item],
          node: node._id
        });
      }
      res.status(200).send("Success!")
    }
  });
});

module.exports = router;
