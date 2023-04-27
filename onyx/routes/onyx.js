const express = require("express");
const router = express.Router();
const path = require("path");
const onyxController = require("../controllers/onyx");
const checkPrivilegio = require("../util/checkPrivilegios");

router.get("/catejercicios", checkPrivilegio('Consultar ejercicio'), onyxController.getCatEjercicios);

router.get("/catentrenamientos", checkPrivilegio('Consultar programa'), onyxController.getCatEntrenamientos);

router.get("/catentrenamientos/:start", checkPrivilegio('Consultar programa'), onyxController.getCatEntrenamientos);

router.get("/programa", checkPrivilegio('Consultar programa'), onyxController.getDetallePrograma);

router.get("/programa/:id_programa", checkPrivilegio('Consultar programa'), onyxController.getDetallePrograma);

router.get("/dieta", checkPrivilegio('Consultar dieta'), onyxController.getDetalleDieta);

router.get("/dieta/:id_dieta", checkPrivilegio('Consultar dieta'), onyxController.getDetalleDieta);

router.get("/dieta", checkPrivilegio('Consultar dieta'), onyxController.getDietaAlimento);

router.get("/dieta/:id_dieta", checkPrivilegio('Consultar dieta'), onyxController.getDietaAlimento);

router.get("/dieta/:id_dieta", checkPrivilegio('Consultar dieta'), onyxController.getDetalleDieta);

router.get("/dietas", checkPrivilegio('Consultar dieta'), onyxController.getDieta);

router.get("/dietas/:start/:numcal", checkPrivilegio('Consultar dieta'), onyxController.getDieta);

router.get("/favoritos", checkPrivilegio('Consultar favoritos'), onyxController.getConsultaFav);

router.get("/favoritos/delete/:id_dieta/:id_programa/:tipo", checkPrivilegio('Eliminar favoritos'),
             onyxController.deleteFavoritos);

router.get("/favoritos/add/:id_dieta?/:id_programa?/:tipo", checkPrivilegio('Registrar favoritos'),
             onyxController.postFavoritos);

router.get("/dashboard", checkPrivilegio('Consultar reporte de progreso'), onyxController.getDashboard);

router.get("/bitacora", checkPrivilegio('Consultar bitácora'), onyxController.getBitacora);

router.get("/bitacora/:fecha", checkPrivilegio('Consultar bitácora'), onyxController.getBitacora);

router.post("/bitacora/delete/:id_bitacora", checkPrivilegio('Eliminar bitácora'), onyxController.deleteBitacora);

router.get("/nuevabitacora", checkPrivilegio('Registrar bitácora'), onyxController.getNuevaBitacora);

router.post("/nuevabitacora", checkPrivilegio('Registrar bitácora'), onyxController.postNuevaBitacora);

router.get("/datos-iniciales", checkPrivilegio('Consultar datos iniciales'), 
            onyxController.getDatosIniciales);

router.get("/registrar-datos-iniciales", checkPrivilegio('Registrar datos iniciales'),
            onyxController.getRegistrarDatosIniciales);

router.post("/registrar-datos-iniciales", checkPrivilegio('Registrar datos iniciales'), 
            checkPrivilegio('Modificar datos iniciales'), onyxController.postRegistrarDatosIniciales);

router.get("/tallas", checkPrivilegio('Consultar tallas'), onyxController.getTallas);

router.post("/tallas", checkPrivilegio('Registrar tallas'), onyxController.postTallas);

router.get("/cuenta", checkPrivilegio('Consultar cuenta'), onyxController.getCuenta);

router.get("/cambiarPassword", checkPrivilegio('Modificar cuenta'), onyxController.getCambiarPassword);

router.post("/cambiarPassword", checkPrivilegio('Modificar cuenta'), onyxController.postCambiarPassword);

router.post("/cuenta", checkPrivilegio('Modificar cuenta'), onyxController.postCuenta);

router.get("/fotoperfil", checkPrivilegio('Modificar cuenta'), onyxController.getFotoPerfil);

router.post("/fotoperfil", checkPrivilegio('Modificar cuenta'), onyxController.postFotoPerfil);

module.exports = router;
