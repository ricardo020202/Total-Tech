const EjercicioModel = require("../models/ejercicio");
const EntrenamientoModel = require("../models/programa");
const DietasModel = require("../models/dietas");
const Talla = require("../models/talla");
const TallaModel = require("../models/talla");
const bcrypt = require("bcryptjs");
const Bitacora = require("../models/bitacora");
const Cliente = require("../models/cliente");

exports.getCatEjercicios = (req, res, next) => {
    EjercicioModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("catEjercicios", {
                ejercicio: rows,
                pagetitle: "Catálogo de Ejercicios",
                user: req.session.user || "",
                path: "/catEjercicios",
            });
        })
        .catch((err) => console.log(err));
};

// exports.getHome = (req, res, next) => {
//     res.render("home", {
//         pagetitle: "Onyx",
//         user: req.session.user || "",
//     });
// };

exports.getAdminDashboard = (req, res, next) => {
    res.render("admindashboard", {
        pagetitle: "Onyx",
        user: req.session.user || "",
    });
};

exports.getCatEntrenamientos = (req, res, next) => {
    EntrenamientoModel.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('catEntrenamientos', {
            programa: rows,
            pagetitle: 'Catálogo de Entrenamientos',
            user: req.session.user || '',
            path: '/catEntrenamientos'
        });
    })
    .catch(err => console.log(err));
  
    /*
    Programa.fetchAll().then(([rows,fieldData]) => {
        console.log(rows);

        response.render('catEntrenamientos', { 
            programas: rows,
            pagetitle: 'Catálogo de Entrenamientos',
            path: '/catEntrenamientos',
            ultimo_programa: request.session.ultimo_programa || '',
            isLoggedIn: request.session.isLoggedIn || false,
            privilegios: request.session.privilegios || [],
        });

    }).catch(error => {console.log(error);});
    */
};

exports.getDieta = (req, res, next) => {

    DietasModel.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('dietas', {
            dietas: rows,
            pagetitle: 'Catálogo de Dietas',
            user: req.session.user || '',
            path: '/dietas'
        });
    })
    .catch(err => console.log(err)); 

};

exports.getFavoritos = (req, res, next) => {
    res.render("favoritos", {
        pagetitle: "Favoritos",
        user: req.session.user || "",
    });
};
 
// ========== Rutas Bitacora ==========
exports.getBitacora = (req, res, next) => {
    // receive fecha from calendar in script.js when user clicks on a date in the calendar and send it to the server
    // if no date is received, then the current date is used
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const fecha = req.params.fecha || `${year}-${month}-${day}`;

    Bitacora.fetchByDate(req.session.email, fecha)
        .then(([rows, fieldData]) => {
            res.render("bitacora", {
                pagetitle: "Bitacora",
                user: req.session.user || "",
                bitacora: rows.filter((row) => row.email === req.session.email),
                fecha: fecha,
            });
        })
        .catch((err) => console.log(err));
};

exports.getNuevaBitacora = (req, res, next) => {
    res.render("nuevaBitacora", {
        pagetitle: "Nueva Bitacora",
        user: req.session.user || "",
        csrfToken: req.csrfToken(),
    });
};

exports.postNuevaBitacora = (req, res, next) => {
    const bitacora = new Bitacora({
        fecha: new Date(),
        contenido: req.body.contenido,
        entreno: req.body.entreno,
        email: req.session.email,
    });

    bitacora
        .save()
        .then(([rows, fieldData]) => {
            res.redirect("/onyx/bitacora");
        })
        .catch((err) => console.log(err));
};

exports.getDashboard = (req, res, next) => {
    const extremidades = [
        "pecho",
        "brazo_izquierdo",
        "brazo_derecho",
        "peso",
        "cintura",
        "cadera",
        "pierna_izquierda",
        "pierna_derecha",
        "pantorrilla_izquierda",
        "pantorrilla_derecha",
        "cuello",
    ];

    const promises = extremidades.map((extremidad) =>
        TallaModel.fetchExtremidad(req.session.email, extremidad)
            .then(([rows, fieldData]) => {
                const medidas = rows.map((row) => row.medida);
                const fechas = rows.map((row) => row.fecha);
                return { medidas, fechas };
            })
            .catch((err) => {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            })
    );

    Promise.all(promises)
        .then((resultados) => {
            extremidades.forEach((extremidad, i) => {
                req.session[extremidad] = resultados[i].medidas;
                req.session[`${extremidad}_fecha`] = resultados[i].fechas;
            });
            res.render("dashboard", {
                pagetitle: "Dashboard",
                user: req.session.user || "",
                pecho: req.session.pecho || "",
                pecho_fecha: req.session.pecho_fecha || "",
                brazoI: req.session.brazo_izquierdo || "",
                brazoI_fecha: req.session.brazo_izquierdo_fecha || "",
                brazoD: req.session.brazo_derecho || "",
                brazoD_fecha: req.session.brazo_derecho_fecha || "",
                peso: req.session.peso || "",
                peso_fecha: req.session.peso_fecha || "",
                cintura: req.session.cintura || "",
                cintura_fecha: req.session.cintura_fecha || "",
                cadera: req.session.cadera || "",
                cadera_fecha: req.session.cadera_fecha || "",
                piernaI: req.session.pierna_izquierda || "",
                piernaI_fecha: req.session.pierna_izquierda_fecha || "",
                piernaD: req.session.pierna_derecha || "",
                piernaD_fecha: req.session.pierna_derecha_fecha || "",
                pantorrillaI: req.session.pantorrilla_izquierda || "",
                pantorrillaI_fecha: req.session.pantorrilla_izquierda_fecha || "",
                pantorrillaD: req.session.pantorrilla_derecha || "",
                pantorrillaD_fecha: req.session.pantorrilla_derecha_fecha || "",
                cuello: req.session.cuello || "",
                cuello_fecha: req.session.cuello_fecha || "",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.getDatosIniciales = (req, res, next) => {
    Cliente.fetchOne(req.session.email)
        .then(([rows, fieldData]) => { 
            if(rows.length === 0) {
                return res.redirect("/onyx/registrar-datos-iniciales");
            }
            else {
                res.render("datosIniciales", {
                    pagetitle: "Datos Iniciales",
                    user: req.session.user || "",
                    cliente: rows[0], 
                });
            }    
        })
        .catch((err) => console.log(err));
};


exports.getRegistrarDatosIniciales = (req, res, next) => {
    res.render("registrarDatos", {
        pagetitle: "Registrar Datos Iniciales",
        user: req.session.user || "",
        csrfToken: req.csrfToken(),
    });
};

exports.postRegistrarDatosIniciales = (req, res, next) => {
    const cliente = new Cliente({
        email: req.session.email, 
        altura: req.body.inputHeight,
        edad: req.body.inputAge,
        nivel_actividad: req.body.inputActivity,
        objetivo: req.body.inputGoal,
        sexo: req.body.inputGender,
        pr_BenchPress: req.body.inputBenchPress,
        pr_PesoMuerto: req.body.inputPesoMuerto,
        pr_Sentadillas: req.body.inputSentadillas,
        //peso: req.body.inputWeight,   
    });
    
    cliente
    .save()
    .then(([rows, fieldData]) => {
            res.redirect("/onyx/datos-iniciales"); 
    })
    .catch((err) => {
        console.log(err);
        cliente
        .update()
        .then(([rows, fieldData]) => {
            res.redirect("/onyx/datos-iniciales"); 
        })
    });
    
};