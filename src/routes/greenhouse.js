const express = require('express');
const verifyToken = require('../jwt/verifyToken')

const router = express.Router();

router.post('/new', verifyToken, (req, res) => {
  console.log(req.body);
});

module.exports = router;
