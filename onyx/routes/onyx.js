const express = require("express");
const router = express.Router();
const path = require("path");

const onyxController = require("../controllers/onyx");

// router.get("/", onyxController.getHome);

router.get('/catejercicios', onyxController.getCatEjercicios);

router.get('/catentrenamientos', onyxController.getCatEntrenamientos);
router.get('/catentrenamientos/:start', onyxController.getCatEntrenamientos);

router.get('/dietas', onyxController.getDieta);
router.get('/dietas/:start/:numcal', onyxController.getDieta);

router.get('/bitacora', onyxController.getBitacora);

router.get('/favoritos', onyxController.getFavoritos);

router.get("/admindashboard", onyxController.getAdminDashboard);

router.get("/admindashboard/userprivileges",onyxController.getAdminDashboardPrivileges);

router.get("/admindashboard/diets",onyxController.getAdminDashboardDietas);

router.get("/admindashboard/workouts",onyxController.getAdminDashboardWorkouts);

router.get('/admindashboard/workouts/nuevoejercicio', onyxController.getAdminNuevoEjercicio);

router.post('/admindashboard/workouts/nuevoejercicio', onyxController.postAdminNuevoEjercicio);

router.get('/dashboard', onyxController.getDashboard);

router.get('/bitacora', onyxController.getBitacora);

router.get('/bitacora/:fecha', onyxController.getBitacora);

router.get('/nuevabitacora', onyxController.getNuevaBitacora);

router.post('/nuevabitacora', onyxController.postNuevaBitacora);

router.get('/datos-iniciales', onyxController.getDatosIniciales);

router.get('/registrar-datos-iniciales', onyxController.getRegistrarDatosIniciales);

router.post('/registrar-datos-iniciales', onyxController.postRegistrarDatosIniciales);

router.get('/tallas', onyxController.getTallas);

router.post('/tallas', onyxController.postTallas);

// router.get('/modificar-tallas', onyxController.getTallas);

// router.post('/modificar-tallas', onyxController.postTallas);

module.exports = router;