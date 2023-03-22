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
    const extremidades = [
        'pecho',
        'brazo_izquierdo',
        'brazo_derecho',
        'peso',
        'cintura',
        'cadera',
        'pierna_izquierda',
        'pierna_derecha',
        'pantorrilla_izquierda',
        'pantorrilla_derecha',
        'cuello'
    ];

    const promises = extremidades.map(extremidad =>
        TallaModel.fetchExtremidad(req.session.email, extremidad)
            .then(([rows, fieldData]) => rows.map(row => row.medida))
            .catch(err => {
                console.log(`Error fetching ${extremidad}: ${err}`);
                return [];
            })
    );

    Promise.all(promises)
        .then(resultados => {
            extremidades.forEach((extremidad, i) => {
                req.session[extremidad] = resultados[i];
            });
            res.render('dashboard', {
                pagetitle: 'Dashboard',
                user: req.session.user || '',
                pecho: req.session.pecho || '',
                brazoI: req.session.brazo_izquierdo || '',
                brazoD: req.session.brazo_derecho || '',
                peso: req.session.peso || '',
                cintura: req.session.cintura || '',
                cadera: req.session.cadera || '',
                piernaI: req.session.pierna_izquierda || '',
                piernaD: req.session.pierna_derecha || '',
                pantorrillaI: req.session.pantorrilla_izquierda || '',
                pantorrillaD: req.session.pantorrilla_derecha || '',
                cuello: req.session.cuello || '',
            });
        })
        .catch(err => console.log(err));
};