const express = require("express");
const router = express.Router();
const path = require("path");
const onyxController = require("../controllers/onyx");

router.get("/catejercicios", onyxController.getCatEjercicios);

router.get("/catentrenamientos", onyxController.getCatEntrenamientos);

router.get("/catentrenamientos/:start", onyxController.getCatEntrenamientos);

router.get("/programa", onyxController.getDetallePrograma);

router.get("/programa/:id_programa", onyxController.getDetallePrograma);

router.get("/dieta", onyxController.getDetalleDieta);

router.get("/dieta/:id_dieta", onyxController.getDetalleDieta);

router.get("/dietas", onyxController.getDieta);

router.get("/dietas/:start/:numcal", onyxController.getDieta);

router.get("/bitacora", onyxController.getBitacora);

router.get("/favoritos", onyxController.getFavoritos);

router.get("/favoritos/delete/:id_dieta/:id_programa/:tipo", onyxController.deleteFavoritos);

router.get("/favoritos/add/:id_dieta?/:id_programa?/:tipo", onyxController.postFavoritos);

router.get("/dashboard", onyxController.getDashboard);

router.get("/bitacora", onyxController.getBitacora);

router.get("/bitacora/:fecha", onyxController.getBitacora);

router.post("/bitacora/delete/:id_bitacora", onyxController.deleteBitacora);

router.get("/nuevabitacora", onyxController.getNuevaBitacora);

router.post("/nuevabitacora", onyxController.postNuevaBitacora);

router.get("/datos-iniciales", onyxController.getDatosIniciales);

router.get("/registrar-datos-iniciales", onyxController.getRegistrarDatosIniciales);

router.post("/registrar-datos-iniciales", onyxController.postRegistrarDatosIniciales);

router.get("/tallas", onyxController.getTallas);

router.post("/tallas", onyxController.postTallas);

router.get('/modificar-tallas', onyxController.getTallas);

router.post('/modificar-tallas', onyxController.postTallas);

router.get("/cuenta", onyxController.getCuenta);

router.get("/editar-cuenta", onyxController.getEditarCuenta);

router.get('/reg_rol', onyxController.getreg_rol);

router.post('/reg_rol', onyxController.postreg_rol);

module.exports = router;
