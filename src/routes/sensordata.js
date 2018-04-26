const express = require("express");
const verifyToken = require("../jwt/verifyToken");
const router = express.Router();

router.post("/register", verifyToken, (req, res) => {

});

router.get("/getAll", verifyToken, (req, res) => {

});

router.post("/update", verifyToken, (req, res) => {

});

module.exports = router;
