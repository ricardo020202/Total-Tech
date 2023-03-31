const express = require("express");
const router = express.Router();
const path = require("path");

const adminController = require("../controllers/admin");

router.get("/admindashboard", adminController.getAdminDashboard);

router.get("/admindashboard/userprivileges",adminController.getAdminDashboardPrivileges);

router.get("/admindashboard/diets",adminController.getAdminDashboardDietas);

router.get("/admindashboard/diets/add",adminController.getAdminNuevaDieta);

router.post("/admindashboard/diets/add",adminController.postAdminNuevaDieta);

router.get("/admindashboard/workouts",adminController.getAdminDashboardWorkouts);

router.get('/admindashboard/workouts/nuevoejercicio', adminController.getAdminNuevoEjercicio);

router.post('/admindashboard/workouts/nuevoejercicio', adminController.postAdminNuevoEjercicio);

router.get('/admindashboard/workouts/nuevoprograma', adminController.getAdminNuevoPrograma);

router.post('/admindashboard/workouts/nuevoprograma', adminController.postAdminNuevoPrograma);

module.exports = router;