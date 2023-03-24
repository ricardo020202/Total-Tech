const express = require("express");
const router = express.Router();
const path = require("path");
const noRegController = require("../controllers/noRegistrados");

router.get("/", noRegController.getHome);

module.exports = router;