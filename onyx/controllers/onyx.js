const EjercicioModel = require('../models/ejercicio');

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

exports.getAdminDashboard = (req, res, next) => {
    res.render('admindashboard', { pagetitle: 'Onyx'});
}


exports.getCatEntrenamientos = (req, res, next) => {
    res.render('catEntrenamientos', { pagetitle: 'Catálogo de Entrenamientos'});    
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