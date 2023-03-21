const EjercicioModel = require('../models/ejercicio');
const Talla = require('../models/talla');
const TallaModel = require('../models/talla');

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

exports.getCalendario = (req, res, next) => {
    res.render('calendario', {
        pagetitle: 'Calendario',
        user: req.session.user || '',
    });
}

exports.getDashboard = (req, res, next) => {
    TallaModel.fetchExtremidad(req.session.email, 'pecho')
        .then(([rows, fieldData]) => {
            req.session.pecho = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'brazo_izquierdo')
        .then(([rows, fieldData]) => {
            req.session.brazoizq = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'brazo_derecho')
        .then(([rows, fieldData]) => {
            req.session.brazoder = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'peso')
        .then(([rows, fieldData]) => {
            req.session.peso = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'cintura')
        .then(([rows, fieldData]) => {
            req.session.cintura = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'cadera')
        .then(([rows, fieldData]) => {
            req.session.cadera = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'pierna_izquierda')
        .then(([rows, fieldData]) => {
            req.session.piernaizq = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'pierna_derecha')
        .then(([rows, fieldData]) => {
            req.session.piernader = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'pantorrilla_izquierda')
        .then(([rows, fieldData]) => {
            req.session.pantorrillaizq = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'pantorrilla_derecha')
        .then(([rows, fieldData]) => {
            req.session.pantorrillader = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetchExtremidad(req.session.email, 'cuello')
        .then(([rows, fieldData]) => {
            req.session.cuello = rows.map(row => row.medida);
        })
        .catch(err => console.log(err));

    TallaModel.fetch(req.session.email)
        .then(([rows, fieldData]) => {;
            res.render('dashboard', {
                pagetitle: 'Dashboard',
                user: req.session.user || '',
                pecho: req.session.pecho || '',
                brazoizq: req.session.brazoizq || '',
                brazoder: req.session.brazoder || '',
                peso: req.session.peso || '',
                cintura: req.session.cintura || '',
                cadera: req.session.cadera || '',
                piernaizq: req.session.piernaizq || '',
                piernader: req.session.piernader || '',
                pantorrillaizq: req.session.pantorrillaizq || '',
                pantorrillader: req.session.pantorrillader || '',
                cuello: req.session.cuello || '',
            });
        })
        .catch(err => console.log(err));
};