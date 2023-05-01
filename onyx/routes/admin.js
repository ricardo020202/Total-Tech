const express = require("express");
const router = express.Router();
const path = require("path");
const checkPrivilegio = require("../util/checkPrivilegios");
const adminController = require("../controllers/admin");
const csrf = require("csurf");
const csrfProtection = csrf();

router.get("/admindashboard", checkPrivilegio('Admin dashboard'),
             adminController.getAdminDashboard);

router.get("/admindashboard/userprivileges", checkPrivilegio('Consultar usuarios'),
             adminController.getAdminDashboardPrivileges);

router.get("/admindashboard/userprivileges/add", checkPrivilegio('Registrar usuarios'),
             adminController.getAdminDashboardAddUser);

router.get("/admindashboard/userprivileges/add/:email", checkPrivilegio('Modificar usuarios'),
             adminController.getAdminDashboardModUser);

router.post("/admindashboard/userprivileges/add/:email", checkPrivilegio('Modificar usuarios'),
            adminController.postAdminDashboardModUser);

router.post("/admindashboard/userprivileges/add", checkPrivilegio('Registrar usuarios'),
             adminController.postAdminDashboardAddUser);

router.post("/admindashboard/userprivileges/delete/:email", checkPrivilegio('Eliminar usuarios'),
             adminController.deleteAdminDashboardUser);

// router.post("/admindashboard/diets/deleteFood/:id", checkPrivilegio('Eliminar alimento'), 
//                 adminController.getAdminDeleteAlimento);

// router.post("/admindashboard/diets/modAlimento/:id", checkPrivilegio('Modificar alimento'),
//                 adminController.postAdminModAlimento);

// router.get("/admindashboard/diets/modAlimento/:id", checkPrivilegio('Modificar alimento'),
//              adminController.getAdminModAlimento);

router.get("/admindashboard/diets", checkPrivilegio('Consultar dieta'), checkPrivilegio('Registrar dieta'),
             adminController.getAdminDashboardDietas);

router.get("/admindashboard/diets/add", csrfProtection, checkPrivilegio('Registrar dieta'),
             adminController.getAdminNuevaDieta);

router.post("/admindashboard/diets/add", checkPrivilegio('Registrar dieta'),
             adminController.postAdminNuevaDieta);

router.get("/admindashboard/diets/edit/:id_dieta", checkPrivilegio('Modificar dieta'),
                adminController.getAdminEditarDieta);

router.post("/admindashboard/diets/edit/:id_dieta", checkPrivilegio('Modificar dieta'),
                adminController.postAdminEditarDieta);

router.post("/admindashboard/diets/delete/:id_dieta", checkPrivilegio('Eliminar dieta'), 
            adminController.postAdminEliminarDieta);

// router.get("/admindashboard/ejercicios", checkPrivilegio('Consultar ejercicio'), checkPrivilegio('Registrar ejercicio'),
//              adminController.getAdminDashboardEjercicios);

// router.get('/admindashboard/ejercicios/nuevoejercicio', checkPrivilegio('Registrar ejercicio'),
//              adminController.getAdminNuevoEjercicio);

// router.post('/admindashboard/ejercicios/nuevoejercicio', checkPrivilegio('Registrar ejercicio'),
//              adminController.postAdminNuevoEjercicio);

// router.post("/admindashboard/ejercicios/delete/:id_ejercicio", checkPrivilegio('Registrar ejercicio'),
//             adminController.deleteAdminEjercicio);

router.get("/admindashboard/programas", checkPrivilegio('Consultar programa'), checkPrivilegio('Registrar programa'),
            adminController.getAdminDashboardProgramas);

router.get('/admindashboard/programas/nuevoprograma', checkPrivilegio('Registrar programa'),
             adminController.getAdminNuevoPrograma);

router.post('/admindashboard/programas/nuevoprograma', checkPrivilegio('Registrar programa'),
             adminController.postAdminNuevoPrograma);

router.get('/admindashboard/programas/editar-programa/:id_Programa', checkPrivilegio('Modificar programa'),
             adminController.getAdminEditarPrograma);

router.post('/admindashboard/programas/editar-programa/:id_Programa', checkPrivilegio('Modificar programa'),
             adminController.postAdminEditarPrograma);

router.post('/admindashboard/programas/eliminar-programa/:id_Programa', checkPrivilegio('Eliminar programa'),
            adminController.postAdminEliminarPrograma);

router.get('/admindashboard/reg_rol', checkPrivilegio('Consultar rol'),
             adminController.getadminreg_rol);

router.post('/admindashboard/reg_rol', checkPrivilegio('Registrar rol'),
             adminController.postadminreg_rol);

router.get("/admindashboard/modrol/:id", checkPrivilegio('Modificar rol'),
             adminController.getAdminModRol);

router.post("/admindashboard/modrol/:id", checkPrivilegio('Modificar rol'),
             adminController.postAdminModRol);

router.get("/admindashboard/reg_rol/delete/:idrol", checkPrivilegio('Modificar rol'),
             adminController.deleteAdminRol);

router.get("/admindashboard/reg_rol/activate/:idrol", checkPrivilegio('Modificar rol'),
             adminController.activateAdminRol);

router.get("/admindashboard/grafclientes", checkPrivilegio('Consultar usuarios'),
             adminController.getAdminInfoCliente);

// router.get("/admindashboard/ejercicios/modificarejercicio/:id_ejercicio", checkPrivilegio('Modificar ejercicio'),
//                 adminController.getmodificarEjercicio);

// router.post("/admindashboard/ejercicios/modificarejercicio/:id_ejercicio", checkPrivilegio('Modificar ejercicio'),
//                 adminController.postmodificarEjercicio);

// router.get("/admindashboard/ejercicios/grafica", checkPrivilegio('Consultar ejercicio'),
//                 adminController.getGraficaEjercicios);

module.exports = router;