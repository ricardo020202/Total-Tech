const EjercicioModel = require("../models/ejercicio");
const EntrenamientoModel = require("../models/programa");
const Alimento = require("../models/alimento");
const DietaAlimento = require("../models/dieta_alimento");
const Dieta = require("../models/dietas");
const Talla = require("../models/talla");
const TallaModel = require("../models/talla");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const Bitacora = require("../models/bitacora");
const Cliente = require("../models/cliente");
const usuario = require("../models/usuario");
const Usuario = require("../models/usuario");
const Favoritos = require("../models/programa_dieta_cliente");
const RolUsuario = require('../models/rol_usuario');
const Rol = require('../models/rol');
const RolPrivilegio = require('../models/rol_privilegio');
const db = require('../util/database');


exports.getCatEjercicios = (req, res, next) => {
    EjercicioModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("catEjercicios", {
                ejercicio: rows,
                pagetitle: "Catálogo de Ejercicios",
                user: req.session.user || "",
                path: "/catEjercicios",
                photo: req.session.photo || 'default.png',
                rol: req.session.rol || "",
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
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
            EntrenamientoModel.isFavorite(req.session.email, "programa")
                .then(([rows2, fieldData2]) => {
                    const favArray = rows2.map((row) => { return row.id_programa; });
                    res.render("catEntrenamientos", {
                        programa: rows,
                        pagetitle: "Catálogo de Entrenamientos",
                        user: req.session.user || "",
                        total_programas: total,
                        favoritos: favArray,
                        photo: req.session.photo || 'default.png',
                        rol: req.session.rol || "",
                    });
                })
                .catch((err) => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            photo: req.session.photo || 'default.png',
                            rol: req.session.rol || "",
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
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};

exports.getDetallePrograma = (req, res, next) => {
    
    const id_programa = req.params.id_programa;

    EntrenamientoModel.fetchById(id_programa)
        .then(([rows, fieldData]) => {
            res.render("programaDetallado", {
                detalles: rows[0],
                pagetitle: "Detalles de Programa",
                user: req.session.user || "",
                photo: req.session.photo || 'default.png',
                rol: req.session.rol || "",
            });
            
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
                return { detalles: [] };
            } else {
                console.log(err);
            }
        });
};

exports.getDetalleDieta = (req, res, next) => {
    
    const id_dieta = req.params.id_dieta;

    Dieta.fetchById(id_dieta)
        .then(([rows, fieldData]) => {
            res.render("dietaDetallada", {
                detalles: rows[0],
                pagetitle: "Detalles de dieta",
                user: req.session.user || "",
                photo: req.session.photo || 'default.png',
                rol: req.session.rol || "",
            });
            
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
                return { detalles: [] };
            } else {
                console.log(err);
            }
        });
};

exports.getDietaAlimento = (req, res, next) => {

    const id_dieta = req.params.id_dieta;

    DietaAlimento.fetchById(id_dieta)
        .then(([rows, fieldData]) => {
            res.render("dietaDetallada", {
                alimentos: rows[0],
                user: req.session.user || "",
                photo: req.session.photo || 'default.png',
                rol: req.session.rol || "",
            });
            
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
                return { detalles: [] };
            } else {
                console.log(err);
            }
        });

};

exports.getDieta = async (req, res, next) => {
    const numcal = req.params.numcal || 0;
    const consulta_total = await Dieta.getTotal(); // [rows, fieldData]
    const total = consulta_total[0][0].total;
    const start = req.params.start ? req.params.start : 0;

    Dieta.fetchByCal(numcal, start)
        .then(([rows, fieldData]) => {
            Dieta.isFavorite(req.session.email, "dieta")
                .then(([rows2, fieldData2]) => {
                    const favArray = rows2.map((row) => row.id_dieta);
                    res.render("dietas", {
                        dietas: rows,
                        pagetitle: "Catálogo de Dietas",
                        user: req.session.user || "",
                        total_dietas: total,
                        numcal: numcal,
                        favoritos: favArray,
                        photo: req.session.photo || 'default.png',
                        rol: req.session.rol || "",
                    });
                })
                .catch((err) => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            photo: req.session.photo || 'default.png',
                            rol: req.session.rol || "",
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
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};

exports.getFavoritos = async (req, res, next) => {
    res.render("favoritos", {
        pagetitle: "Favoritos",
        user: req.session.user || "",
        photo: req.session.photo || 'default.png',
        rol: req.session.rol || "",
    });
};

exports.postFavoritos = (req, res, next) => {
    const id_dieta = req.params.id_dieta || null;
    const id_programa = req.params.id_programa || null;
    const tipo = req.params.tipo;

    const favorito = new Favoritos({
        id_programa: id_programa,
        id_dieta: id_dieta,
        email: req.session.email,
        tipo: tipo,
    });

    favorito.save()
        .then(([rows, fieldData]) => {
            req.flash("success", "Se agrego a tus favoritos");
            res.redirect("/onyx/favoritos");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteFavoritos = (req, res, next) => {
    const id_dieta = req.params.id_dieta || null;
    const id_programa = req.params.id_programa || null;
    const tipo = req.params.tipo;

    Favoritos.deleteById(id_dieta,id_programa,tipo)
        .then(([rows, fieldData]) => {
            req.flash("success", "Se elimino de tus favoritos");
            res.redirect("/onyx/favoritos");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
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

    if (req.query.action === "delete" && req.query.id) {
        const id_bitacora = req.query.id;
        Bitacora.deleteById(id_bitacora)
            .then(() => {
                console.log(
                    `Bitacora with id ${id_bitacora} has been deleted.`
                );
                res.redirect(`/bitacora/${fecha}`);
            })
            .catch((err) => {
                console.log(err);
                res.render("error", {
                    message: "Error deleting bitacora record",
                    error: err,
                    photo: req.session.photo || "",
                    rol: req.session.rol || "",
                });
            });
    } else {
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
                            csrfToken: req.csrfToken(),
                            photo: req.session.photo || 'default.png',
                            rol: req.session.rol || "",
                        });
                    })
                    .catch((err) => {
                        if (err.code === "PROTOCOL_CONNECTION_LOST") {
                            res.render("dbDown", {
                                pagetitle: "Error",
                                user: req.session.user || "",
                                photo: req.session.photo || 'default.png',
                                rol: req.session.rol || "",
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
                        photo: req.session.photo || 'default.png',
                        rol: req.session.rol || "",
                    });
                } else {
                    console.log(err);
                }
            });
    }
};

exports.deleteBitacora = (req, res, next) => {
    const id_bitacora = req.params.id_bitacora;

    Bitacora.deleteById(id_bitacora)
        .then(([result]) => {
            req.flash("success", "Bitacora deleted successfully");
            res.redirect("/onyx/bitacora");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });

    res.locals.messeges = req.flash();
};

exports.getNuevaBitacora = (req, res, next) => {
    res.render("nuevaBitacora", {
        pagetitle: "Nueva Bitacora",
        user: req.session.user || "",
        csrfToken: req.csrfToken(),
        photo: req.session.photo || 'default.png',
        rol: req.session.rol || "",
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
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
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
                        photo: req.session.photo || 'default.png',
                        rol: req.session.rol || "",
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
                photo: req.session.photo || 'default.png',
                rol: req.session.rol || "",
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
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
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            }
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
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
        photo: req.session.photo || 'default.png',
        rol: req.session.rol || "",
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
                    photo: req.session.photo || 'default.png',
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
                        photo: req.session.photo || 'default.png',
                        rol: req.session.rol || "",
                    });
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
                        photo: req.session.photo || 'default.png',
                        sexo: req.session.sex || "",
                        csrfToken: req.csrfToken(),
                        photo: req.session.photo || "",
                        rol: req.session.rol || "",
                    });
                })
                .catch((err) => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            photo: req.session.photo || 'default.png',
                            rol: req.session.rol || "",
                        });
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
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
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
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });
};

exports.getCuenta = (req, res, next) => {
    Usuario.fetchOne(req.session.email)
        .then(([rows, fieldData]) => {
            req.session.usuario = rows
            Cliente.fetchOne(req.session.email)
            .then(([rows, fieldData]) => {
                    req.session.cliente = rows
                    res.render("cuenta", {
                        pagetitle: "Cuenta",
                        user: req.session.user || "",
                        usuario: req.session.usuario || "",
                        cliente: req.session.cliente || "",
                        csrfToken: req.csrfToken(),
                        photo: req.session.photo || 'default.png',
                        rol: req.session.rol || "",
                    });
                })
                .catch((err) => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            photo: req.session.photo || 'default.png',
                            rol: req.session.rol || "",
                        });
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
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });
};

exports.postCuenta = (req, res, next) => {

    
    const usuario = new Usuario({
        email: req.session.email,
        nombre: req.body.inputNombre,
        apellidos: req.body.inputApellidos,
        user_pic: req.file.filename,
    });
    usuario
        .save()
        .then((result) => {
            
            
            res.redirect("/onyx/cuenta");
            res.status(300).redirect("/onyx/cuenta");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });
};

exports.getCambiarPassword= (req, res, next) => {
    res.render("cambiarPassword", {
        pagetitle: "Cambiar Password",
        user: req.session.user || "",
        csrfToken: req.csrfToken(),
        photo: req.session.photo || 'default.png',
        rol: req.session.rol || "",
    });
};

exports.postCambiarPassword = (req, res, next) => {
    const { contraseña, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.redirect("/onyx/cambiarPassword");
    }

    if (newPassword === contraseña) {
        return res.redirect("/onyx/cambiarPassword");
    }

    Usuario.fetchOne(req.session.email)
        .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                bcrypt.compare(req.body.password, rows[0].contraseña).then((doMatch) => {
                    if (doMatch) {
                        usuario.changePassword(req.session.email, newPassword)
                            .then((result) => {
                                
                                res.redirect("/onyx/cuenta");
                            }
                            )
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        res.redirect("/onyx/cambiarPassword");
                    }
                });
            }
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });
};

exports.getFotoPerfil = (req, res, next) => {
    res.render("fotoperfil", {
        pagetitle: "Foto de Perfil",
        user: req.session.user || "",
        csrfToken: req.csrfToken(),
        photo: req.session.photo || 'default.png',
        rol: req.session.rol || "",
    });
};

exports.postFotoPerfil = (req, res, next) => {

    const user_pic = req.file.filename;
    const email = req.session.email;

    usuario
        .savePhoto(email, user_pic)
        .then((result) => {
            req.session.photo = user_pic;
            res.redirect("/onyx/cuenta");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });
};

exports.getConsultaFav = async (req, res, next) => {
    try {
        let dietas = [];
        let ejercicios = [];
        const [rows] = await Favoritos.fetchByEmail(req.session.email);
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].tipo == "dieta") {
                const [rows2, fieldData] = await Dieta.fetchById(rows[i].id_dieta);
                dietas.push(rows2[0]);
            } else {
                const [rows3, fieldData] = await EntrenamientoModel.fetchById(rows[i].id_programa);
                ejercicios.push(rows3[0]);
            }
        }
        res.render("favoritos", {
            pagetitle: "Consulta Favoritos",
            user: req.session.user || "",
            favoritos_dietas: dietas,
            favoritos_ejercicios: ejercicios,
            csrfToken: req.csrfToken(),
            photo: req.session.photo || 'default.png',
            rol: req.session.rol || "",
        });
    } catch (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            res.render("dbDown", {
                pagetitle: "Error",
                user: req.session.user || "",
                photo: req.session.photo || 'default.png',
                rol: req.session.rol || "",
            });
        } else {
            console.log(err);
        }
    }
};
