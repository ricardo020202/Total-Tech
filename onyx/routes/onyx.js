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

router.get('/dashboard', onyxController.getDashboard);

router.get('/bitacora', onyxController.getBitacora);

router.get('/nuevabitacora', onyxController.getNuevaBitacora);

router.post('/nuevabitacora', onyxController.postNuevaBitacora);

module.exports = router;