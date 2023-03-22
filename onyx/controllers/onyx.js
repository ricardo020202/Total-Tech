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
    const extremidades = ['pecho', 'brazo_izquierdo', 'brazo_derecho',
        'peso', 'cintura', 'cadera', 'pierna_izquierda',
        'pierna_derecha', 'pantorrilla_izquierda',
        'pantorrilla_derecha', 'cuello'];

    const promises = extremidades.map(extremidad =>
        TallaModel.fetchExtremidad(req.session.email, extremidad)
            .then(([rows, fieldData]) => {
                const medidas = rows.map(row => row.medida);
                const fechas = rows.map(row => row.fecha);
                return { medidas, fechas };
            })
            .catch(err => {
                console.log(`Error fetching ${extremidad}: ${err}`);
                return { medidas: [], fechas: [] };
            })
    );

    Promise.all(promises)
        .then(resultados => {
            extremidades.forEach((extremidad, i) => {
                req.session[extremidad] = resultados[i].medidas;
                req.session[`${extremidad}_fecha`] = resultados[i].fechas;
            });
            res.render('dashboard', {
                pagetitle: 'Dashboard',
                user: req.session.user || '',
                pecho: req.session.pecho || '',
                pecho_fecha: req.session.pecho_fecha || '',
                brazoI: req.session.brazo_izquierdo || '',
                brazoI_fecha: req.session.brazo_izquierdo_fecha || '',
                brazoD: req.session.brazo_derecho || '',
                brazoD_fecha: req.session.brazo_derecho_fecha || '',
                peso: req.session.peso || '',
                peso_fecha: req.session.peso_fecha || '',
                cintura: req.session.cintura || '',
                cintura_fecha: req.session.cintura_fecha || '',
                cadera: req.session.cadera || '',
                cadera_fecha: req.session.cadera_fecha || '',
                piernaI: req.session.pierna_izquierda || '',
                piernaI_fecha: req.session.pierna_izquierda_fecha || '',
                piernaD: req.session.pierna_derecha || '',
                piernaD_fecha: req.session.pierna_derecha_fecha || '',
                pantorrillaI: req.session.pantorrilla_izquierda || '',
                pantorrillaI_fecha: req.session.pantorrilla_izquierda_fecha || '',
                pantorrillaD: req.session.pantorrilla_derecha || '',
                pantorrillaD_fecha: req.session.pantorrilla_derecha_fecha || '',
                cuello: req.session.cuello || '',
                cuello_fecha: req.session.cuello_fecha || '',
            });
            console.log(req.session.pecho_fecha);
        })
        .catch(err => console.log(err));
};