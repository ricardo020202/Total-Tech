const express = require("express");
const router = express.Router();
const path = require("path");
const flash = require("connect-flash");

const onyxController = require("../controllers/onyx");

router.get("/catejercicios", onyxController.getCatEjercicios);

router.get("/catentrenamientos", onyxController.getCatEntrenamientos);

router.get("/catentrenamientos/:start", onyxController.getCatEntrenamientos);

router.get("/dietas", onyxController.getDieta);

router.get("/dietas/:start/:numcal", onyxController.getDieta);

router.get("/bitacora", onyxController.getBitacora);

router.get("/favoritos", onyxController.getFavoritos);

router.get("/dashboard", onyxController.getDashboard);

router.get("/bitacora", onyxController.getBitacora);

router.get("/bitacora/:fecha", onyxController.getBitacora);

router.post("/bitacora/delete/:id_bitacora", onyxController.deleteBitacora);

router.get("/nuevabitacora", onyxController.getNuevaBitacora);

router.post("/nuevabitacora", onyxController.postNuevaBitacora);

router.get("/datos-iniciales", onyxController.getDatosIniciales);

router.get(
    "/registrar-datos-iniciales",
    onyxController.getRegistrarDatosIniciales
);

router.post(
    "/registrar-datos-iniciales",
    onyxController.postRegistrarDatosIniciales
);

router.get("/tallas", onyxController.getTallas);

router.post("/tallas", onyxController.postTallas);

// router.get('/modificar-tallas', onyxController.getTallas);

// router.post('/modificar-tallas', onyxController.postTallas);

router.get("/cuenta", onyxController.getCuenta);

router.get("/editar-cuenta", onyxController.getEditarCuenta);

module.exports = router;
