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
const RolUsuario = require('../models/rol_usuario');
const reg_rol = require('../models/reg_rol');
const Rol = require('../models/rol');
const RolPrivilegio = require('../models/rol_privilegio');
const db = require('../util/database');


exports.postreg_rol = (req, res, next) => {
    const email = req.session.email;
    const tipoRol = req.body.id_rol;
    
    const rolUsuario = new Rol(tipoRol, email);
    rolUsuario.save()
      .then(resultado => {
        console.log('Registro guardado en la base de datos.');
        res.redirect('/'); 
      })
      .catch(error => {
        console.log('Error al guardar el registro en la base de datos:', error);
        res.redirect('/');
      });
};

exports.getreg_rol = (req, res, next) => {
    res.render("reg_rol", {
      pagetitle: "Registro de Rol",
      user: req.session.user, // o como se llame la variable en la sesión
      csrfToken: req.csrfToken()
    });
};

exports.registrarRol = async (req, res) => {
    try {
        const { id_rol, nombre_rol, id_cu } = req.body;
        const ids_casos_uso = id_cu.split(',');

        // Insertar rol en la tabla rol
        const rol = new Rol({nombre: nombre_rol});
        const [result] = await rol.save();
        const insertedIdRol = result.insertId;

        // Insertar registros en la tabla rol_privilegio
        for (const id_caso_uso of ids_casos_uso) {
            const rolPrivilegio = new RolPrivilegio(insertedIdRol, id_caso_uso.trim());
            await rolPrivilegio.save();
        }

        res.status(200).json({ message: 'Rol registrado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el rol.', error });
    }
};



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

exports.getCatEntrenamientos = async (req, res, next) => {
    const consulta_total = await EntrenamientoModel.getTotal();
    const total = consulta_total[0][0].total;
    const start = req.params.start ? req.params.start : 0;

    EntrenamientoModel.fetchAll(start)
        .then(([rows, fieldData]) => {
            res.render("catEntrenamientos", {
                programa: rows,
                pagetitle: "Catálogo de Entrenamientos",
                user: req.session.user || "",
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
        });
};

exports.getDieta = async (req, res, next) => {
    const numcal = req.params.numcal || "";
    const consulta_total = await Dieta.getTotal(); // [rows, fieldData]
    const total = consulta_total[0][0].total;
    const start = req.params.start ? req.params.start : 0;

    Dieta.fetchByCal(numcal, start)
        .then(([rows, fieldData]) => {
            res.render("dietas", {
                dietas: rows,
                pagetitle: "Catálogo de Dietas",
                user: req.session.user || "",
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
        });
};

exports.getFavoritos = async(req, res, next) => {
    //const numcal = req.params.numcal || "";
    const consulta_total = await Favoritos.getTotal(); 
    const total = consulta_total[0][0].total;
    const start = req.params.start ? req.params.start : 0;

    Favoritos.fetchById(start)
        .then(([rows, fieldData]) => {
            res.render("favoritos", {
                favoritos: rows,
                pagetitle: "Favoritos",
                user: req.session.user || "",
                total_favoritos: total,
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
                return { favoritos: [] };
            } else {
                console.log(err);
            }
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

    Bitacora.fetch10(req.session.email)
        .then(([rows, fieldData]) => {
            req.session.bit10 = rows;
            Bitacora.fetchByDate(req.session.email, fecha)
                .then(([rows, fieldData]) => {
                    res.render("bitacora", {
                        pagetitle: "Bitacora",
                        user: req.session.user || "",
                        bitacora: rows.filter(
                            (row) => row.email === req.session.email
                        ),
                        fecha: fecha,
                        bit10: req.session.bit10,
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
            } else {
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
                cliente.update().then(([rows, fieldData]) => {
                    res.redirect("/onyx/datos-iniciales");
                });
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
