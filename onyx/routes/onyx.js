const express = require("express");
const router = express.Router();
const path = require("path");

const onyxController = require("../controllers/onyx");

// router.get("/", onyxController.getHome);

router.get('/catejercicios', onyxController.getCatEjercicios);

router.get('/catentrenamientos', onyxController.getCatEntrenamientos);
//router.get('/catentrenamientos/:', onyxController.getCatEntrenamientos);

router.get('/dietas', onyxController.getDieta);
//router.get('/dietas/:start', onyxController.getDieta);
router.get('/dietas/:numcal', onyxController.getDieta);

// router.get('/dietasparati', onyxController.getDietasparaTi);

router.get('/bitacora', onyxController.getBitacora);

router.get('/favoritos', onyxController.getFavoritos);

router.get("/admindashboard", onyxController.getAdminDashboard);

router.get("/admindashboard/userprivileges",onyxController.getAdminDashboardPrivileges);

router.get('/dashboard', onyxController.getDashboard);

router.get('/bitacora', onyxController.getBitacora);

router.get('/bitacora/:fecha', onyxController.getBitacora);

router.get('/nuevabitacora', onyxController.getNuevaBitacora);

router.post('/nuevabitacora', onyxController.postNuevaBitacora);

router.get('/datos-iniciales', onyxController.getDatosIniciales);

router.get('/registrar-datos-iniciales', onyxController.getRegistrarDatosIniciales);

router.post('/registrar-datos-iniciales', onyxController.postRegistrarDatosIniciales);

// router.get('/tallas', onyxController.getTallas);

// router.post('/tallas', onyxController.postTallas);

// router.get('/modificar-tallas', onyxController.getTallas);

// router.post('/modificar-tallas', onyxController.postTallas);

module.exports = router;