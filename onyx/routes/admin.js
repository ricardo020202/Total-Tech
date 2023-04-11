const express = require("express");
const router = express.Router();
const path = require("path");

const adminController = require("../controllers/admin");

router.get("/admindashboard", adminController.getAdminDashboard);

router.get("/admindashboard/userprivileges",adminController.getAdminDashboardPrivileges);

router.get("/admindashboard/userprivileges/add",adminController.getAdminDashboardAddUser);

router.get("/admindashboard/userprivileges/add/:email", adminController.getAdminDashboardAddUser);

router.post("/admindashboard/userprivileges/add",adminController.postAdminDashboardAddUser);

router.post("/admindashboard/userprivileges/delete/:email", adminController.deleteAdminDashboarUser);

router.get("/admindashboard/diets",adminController.getAdminDashboardDietas);

router.get("/admindashboard/diets/add",adminController.getAdminNuevaDieta);

router.post("/admindashboard/diets/add",adminController.postAdminNuevaDieta);

router.get("/admindashboard/ejercicios",adminController.getAdminDashboardEjercicios);

router.get('/admindashboard/ejercicios/nuevoejercicio', adminController.getAdminNuevoEjercicio);

router.post('/admindashboard/ejercicios/nuevoejercicio', adminController.postAdminNuevoEjercicio);

router.get("/admindashboard/programas",adminController.getAdminDashboardProgramas);

router.get('/admindashboard/programas/nuevoprograma', adminController.getAdminNuevoPrograma);

router.post('/admindashboard/programas/nuevoprograma', adminController.postAdminNuevoPrograma);

module.exports = router;