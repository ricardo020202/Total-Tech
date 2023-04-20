const express = require("express");
const router = express.Router();
const path = require("path");
const checkPrivilegio = require("../util/checkPrivilegios");
const adminController = require("../controllers/admin");

router.get("/admindashboard", checkPrivilegio('Admin dashboard'),
             adminController.getAdminDashboard);

router.get("/admindashboard/userprivileges", checkPrivilegio('Consultar usuarios'),
             adminController.getAdminDashboardPrivileges);

router.get("/admindashboard/userprivileges/add", checkPrivilegio('Registrar usuarios'),
             adminController.getAdminDashboardAddUser);

router.get("/admindashboard/userprivileges/add/:email", checkPrivilegio('Modificar usuarios'),
             adminController.getAdminDashboardAddUser);

router.post("/admindashboard/userprivileges/add", checkPrivilegio('Registrar usuarios'),
             adminController.postAdminDashboardAddUser);

router.post("/admindashboard/userprivileges/delete/:email", checkPrivilegio('Eliminar usuarios'),
             adminController.deleteAdminDashboarUser);

router.get("/admindashboard/diets", checkPrivilegio('Consultar dieta'),
             adminController.getAdminDashboardDietas);

router.get("/admindashboard/diets/add", checkPrivilegio('Registrar dieta'),
             adminController.getAdminNuevaDieta);

router.post("/admindashboard/diets/add", checkPrivilegio('Registrar dieta'),
             adminController.postAdminNuevaDieta);

router.get("/admindashboard/ejercicios", checkPrivilegio('Consultar ejercicio'),
             adminController.getAdminDashboardEjercicios);

router.get('/admindashboard/ejercicios/nuevoejercicio', checkPrivilegio('Registrar ejercicio'),
             adminController.getAdminNuevoEjercicio);

router.post('/admindashboard/ejercicios/nuevoejercicio', checkPrivilegio('Registrar ejercicio'),
             adminController.postAdminNuevoEjercicio);

router.get("/admindashboard/programas", checkPrivilegio('Consultar programa'),
            adminController.getAdminDashboardProgramas);

router.get('/admindashboard/programas/nuevoprograma', checkPrivilegio('Registrar programa'),
             adminController.getAdminNuevoPrograma);

router.post('/admindashboard/programas/nuevoprograma', checkPrivilegio('Registrar programa'),
             adminController.postAdminNuevoPrograma);

router.get('/admindashboard/programas/editar-programa/:id_Programa', checkPrivilegio('Modificar programa'),
             adminController.getAdminEditarPrograma);

router.post('/admindashboard/programas/editar-programa/:id_Programa', checkPrivilegio('Modificar programa'),
             adminController.postAdminEditarPrograma);

router.get('/admindashboard/reg_rol', checkPrivilegio('Consultar rol'),
             adminController.getadminreg_rol);

router.post('/admindashboard/reg_rol', checkPrivilegio('Registrar rol'),
             adminController.postadminreg_rol);

router.get("/admindashboard/modrol", checkPrivilegio('Modificar rol'),
             adminController.getAdminModRol);

router.post("/admindashboard/modrol", checkPrivilegio('Modificar rol'),
             adminController.postAdminModRol);

router.get("/admindashboard/grafclientes",adminController.getAdminInfoCliente);


module.exports = router;