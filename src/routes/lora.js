const express = require('express');
const verifyToken = require('../jwt/verifyToken')

const router = express.Router();

router.post('/lora/uplink', verifyToken, (req, res) => {
  console.log(req.body);
  res.status(200).send("hallo");
});

module.exports = router;
