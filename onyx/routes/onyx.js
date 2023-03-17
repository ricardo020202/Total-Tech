const express = require("express");
const router = express.Router();
const path = require("path");

const onyxController = require("../controllers/onyx");

router.get("/", onyxController.getHome);

router.get('/catejercicios', onyxController.getCatEjercicios);

router.get('/catentrenamientos', onyxController.getCatEntrenamientos);

router.get('/dietasparati', onyxController.getDietasparaTi);

router.get('/dietas', onyxController.getDietas);

router.get('/bitacora', onyxController.getBitacora);

router.get('/favoritos', onyxController.getFavoritos);
// router.get("/admindashboard", onyxController.getAdminDashboard);

module.exports = router;