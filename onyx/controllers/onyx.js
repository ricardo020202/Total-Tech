<<<<<<< HEAD
const Programa = require("../models/programa");
=======
const EjercicioModel = require('../models/ejercicio');
>>>>>>> models

exports.getCatEjercicios = (req, res, next) => {
    EjercicioModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('catEjercicios', {
                ejercicio: rows,
                pagetitle: 'Catálogo de Ejercicios',
                path: '/catEjercicios'
            });
        })
        .catch(err => console.log(err));
};

exports.getHome = (req, res, next) => {
    res.render('home', { pagetitle: 'Onyx'});
};

// exports.getAdminDashboard = (req, res, next) => {
//     res.render('admindashboard', { pagetitle: 'Onyx'});
// }

<<<<<<< HEAD
exports.getCatEjercicios = (req, res, next) => {
    res.render('catEjercicios', { pagetitle: 'Catálogo de Ejercicios'});    
}
=======

// exports.getCatEjercicios = (req, res, next) => {
//     res.render('catEjercicios', { pagetitle: 'Catálogo de Ejercicios'});    
// }
>>>>>>> models

exports.getCatEntrenamientos = (req, res, next) => {

    Programa.fetchAll().then(([rows,fieldData]) => {
        console.log(rows);

        response.render('catEntrenamientos', { 
            programas: rows,
            pagetitle: 'Catálogo de Entrenamientos',
            ultimo_programa: request.session.ultimo_programa || '',
            isLoggedIn: request.session.isLoggedIn || false,
            privilegios: request.session.privilegios || [],
        });

    }).catch(error => {console.log(error);});
}

exports.getDietasparaTi = (req, res, next) => {
    res.render('dietasParaTi', { pagetitle: 'Dietas para ti'});    
}

exports.getDietas = (req, res, next) => {
    res.render('dietas', { pagetitle: 'Dietas'});    
}

exports.getBitacora = (req, res, next) => {
    res.render('bitacora', { pagetitle: 'Bitácora'});    
}

exports.getFavoritos = (req, res, next) => {
    res.render('favoritos', { pagetitle: 'Favoritos'});    
}