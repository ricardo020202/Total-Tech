const express = require("express");
const router = express.Router();
const path = require("path");

const onyxController = require("../controllers/onyx");

router.get("/", onyxController.getHome);

module.exports = router;