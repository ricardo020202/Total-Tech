const EjercicioModel = require('../models/ejercicio');

exports.getCatEjercicios = (req, res, next) => {
    EjercicioModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('catEjercicios', {
                ejercicio: rows,
                pagetitle: 'Catálogo de Ejercicios',
                user: req.session.user || '',
                path: '/catEjercicios'
            });
        })
        .catch(err => console.log(err));
};

exports.getHome = (req, res, next) => {
    res.render('home', { 
        pagetitle: 'Onyx',
        user: req.session.user || '',
    });
};

exports.getAdminDashboard = (req, res, next) => {
    res.render('admindashboard', { 
        pagetitle: 'Onyx',
        user: req.session.user || '',
    });
}


exports.getCatEntrenamientos = (req, res, next) => {
    res.render('catEntrenamientos', { 
        pagetitle: 'Catálogo de Entrenamientos',
        user: req.session.user || '',
    });    
}

exports.getDietasparaTi = (req, res, next) => {
    res.render('dietasParaTi', { 
        pagetitle: 'Dietas para ti',
        user: req.session.user || '',
    });    
}

exports.getDietas = (req, res, next) => {
    res.render('dietas', { 
        pagetitle: 'Dietas',
        user: req.session.user || '',
    });    
}

exports.getBitacora = (req, res, next) => {
    res.render('bitacora', { 
        pagetitle: 'Bitácora',
        user: req.session.user || '',
    });    
}

exports.getFavoritos = (req, res, next) => {
    res.render('favoritos', { 
        pagetitle: 'Favoritos',
        user: req.session.user || '',
    });    
}