const express = require("express");
const router = express.Router();
const path = require("path");
const noRegController = require("../controllers/noRegistrados");

router.get("/", noRegController.getHome);

router.get("/TermYCond", noRegController.getTerms);

module.exports = router;