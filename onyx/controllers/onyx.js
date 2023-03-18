const Programa = require("../models/programa");


exports.getHome = (req, res, next) => {
    res.render('home', { pagetitle: 'Onyx'});
};

// exports.getAdminDashboard = (req, res, next) => {
//     res.render('admindashboard', { pagetitle: 'Onyx'});
// }

exports.getCatEjercicios = (req, res, next) => {
    res.render('catEjercicios', { pagetitle: 'Catálogo de Ejercicios'});    
}

exports.getCatEntrenamientos = (req, res, next) => {

    Programa.fetchAll().then(([rows,fieldData]) => {
        console.log(rows);

        response.render('catEntrenamientos', { 
            programas: rows,
            //! pagetitle: 'Catálogo de Entrenamientos', le dejo esto??
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