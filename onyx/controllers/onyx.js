const EjercicioModel = require("../models/ejercicio");
const EntrenamientoModel = require("../models/programa");
const Alimento = require("../models/alimento");
const DietaAlimento = require("../models/dieta_alimento");
const Dieta = require("../models/dietas");
const Talla = require("../models/talla");
const TallaModel = require("../models/talla");
const bcrypt = require("bcryptjs");
const Bitacora = require("../models/bitacora");
const Cliente = require("../models/cliente");
const usuario = require("../models/usuario");

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
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};


exports.getAdminDashboardWorkouts= async (req, res, next) => {
    EjercicioModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("adminDashboardWorkout", {
                ejercicio: rows,
                pagetitle: "adminWorkouts",
                user: req.session.user || "",
                path: "/adminDashboardWorkout",
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};



exports.getAdminDashboardDietas = async (req, res, next) => {
    Dieta.fetchAll()
    .then(([rows, fieldData]) => {
        res.render("adminDashboardDietas", {
            dieta: rows,
            pagetitle: "Catálogo de Dietas",
            user: req.session.user || "",
            path: "/adminDashboardDietas",
        });
    })
    .catch((err) => {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            res.render("dbDown", {
                pagetitle: "Error",
                user: req.session.user || "",
            });
            return { medidas: [], fechas: [] };
        } else {
            console.log(err);
        }
    });
};


exports.getAdminDashboardPrivileges=(req, res, next) => {
    let results = [];

    usuario.getPrivilegios()
      .then(rows => {
        rows.forEach(row => {
          results.push(row);
        });
        console.log("results:",results[0]);
        res.render("adminDashboardPrivileges", {
            usersArray:results[0],
            pagetitle: "Users",
            user: req.session.user || "",
        });
      })
      .catch(error => {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            res.render("dbDown", {
                pagetitle: "Error",
                user: req.session.user || "",
            });
            return { medidas: [], fechas: [] };
        } else {
            console.log(error);
        }
      });
}

exports.getAdminDashboard = (req, res, next) => {
    res.render("admindashboard", {
        pagetitle: "Admin dashboard",
        user: req.session.user || "",
    });
};

exports.getCatEntrenamientos = async(req, res, next) => {
    
    const start = req.params.start ? req.params.start : 0
    const consulta_total = await EntrenamientoModel.getTotal();
    const total = consulta_total[0][0].total;
    
    EntrenamientoModel.fetchAll(start)
    .then(([rows, fieldData]) => {
        res.render('catEntrenamientos', {
            programa: rows,
            pagetitle: 'Catálogo de Entrenamientos',
            user: req.session.user || '',
            total_programas: total,
        });
    })
    .catch((err) => {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            res.render("dbDown", {
                pagetitle: "Error",
                user: req.session.user || "",
            });
            return { medidas: [], fechas: [] };
        } else {
            console.log(err);
        }
    })
  
};

exports.getDieta = async (req, res, next) => {

    const numcal = req.params.numcal || '';
    const consulta_total = await Dieta.getTotal();// [rows, fieldData]
    const total = consulta_total[0][0].total;

    const start = req.params.start ? req.params.start : 0
    
    Dieta.fetchByCal(numcal,start)
    .then(([rows, fieldData]) => {
        res.render('dietas', {
            dietas: rows,
            pagetitle: 'Catálogo de Dietas',
            user: req.session.user || '',
            total_dietas: total,
            numcal: numcal,
        });
    })
    .catch((err) => {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            res.render("dbDown", {
                pagetitle: "Error",
                user: req.session.user || "",
            });
            return { medidas: [], fechas: [] };
        } else {
            console.log(err);
        }
    })

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
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
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
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
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
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    res.render("dbDown", {
                        pagetitle: "Error",
                        user: req.session.user || "",
                    });
                    return { medidas: [], fechas: [] };
                } else {
                    console.log(err);
                }
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
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};

exports.getDatosIniciales = (req, res, next) => {
    Cliente.fetchOne(req.session.email)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
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
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
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
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
            cliente
                .update()
                .then(([rows, fieldData]) => {
                    res.redirect("/onyx/datos-iniciales");
                })
            }
        });

};

exports.getTallas = (req, res, next) => {
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
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    res.render("dbDown", {
                        pagetitle: "Error",
                        user: req.session.user || "",
                    });
                    return { medidas: [], fechas: [] };
                } else {
                    console.log(err);
                }
            })
    );

    Promise.all(promises)
        .then((resultados) => {
            extremidades.forEach((extremidad, i) => {
                req.session[extremidad] = resultados[i].medidas;
                req.session[`${extremidad}_fecha`] = resultados[i].fechas;
            });
            Cliente.getSex(req.session.email)
                .then(([rows, fieldData]) => {
                    req.session.sex = rows[0].sexo;
                    res.render("tallas", {
                        pagetitle: "Tallas",
                        user: req.session.user || "",
                        pecho: req.session.pecho || "",
                        brazoI: req.session.brazo_izquierdo || "",
                        brazoD: req.session.brazo_derecho || "",
                        peso: req.session.peso || "",
                        cintura: req.session.cintura || "",
                        cadera: req.session.cadera || "",
                        piernaI: req.session.pierna_izquierda || "",
                        piernaD: req.session.pierna_derecha || "",
                        pantorrillaI: req.session.pantorrilla_izquierda || "",
                        pantorrillaD: req.session.pantorrilla_derecha || "",
                        cuello: req.session.cuello || "",
                        sexo: req.session.sex || "",
                        csrfToken: req.csrfToken(),
                    });
                })
                .catch((err) => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                        });
                        return { medidas: [], fechas: [] };
                    } else {
                        console.log(err);
                    }
                });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};

exports.postTallas = (req, res, next) => {
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

    const promises = extremidades.map((extremidad) => {
        const talla = new TallaModel({
            email: req.session.email,
            extremidad: extremidad,
            medida: req.body[`input${extremidad}`],
            fecha: new Date(),
        });
        return talla.save();
    });

    Promise.all(promises)
        .then((resultados) => {
            res.redirect("/onyx/tallas");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};