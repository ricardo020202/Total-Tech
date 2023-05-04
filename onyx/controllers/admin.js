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
const Rol = require("../models/rol");
const usuario = require("../models/usuario");
const RolUsuario = require("../models/rol_usuario");
const RolPrivilegio = require("../models/rol_privilegio");
const Privilegio = require("../models/privilegio");
const ProgramaEjercicio = require("../models/programa_ejercicio");
const db = require("../util/database");
const { parse } = require("path");

// exports.getAdminDashboardEjercicios = async (req, res, next) => {
//     EjercicioModel.fetchAll()
//         .then(([rows, fieldData]) => {
//             res.render("adminDashboardEjercicio", {
//                 ejercicio: rows,
//                 pagetitle: "adminEjercicios",
//                 user: req.session.user || "",
//                 photo: req.session.photo || "",
//                 csrfToken: req.csrfToken(),
//             });
//         })
//         .catch((err) => {
//             if (err.code === "PROTOCOL_CONNECTION_LOST") {
//                 res.render("dbDown", {
//                     pagetitle: "Error",
//                     user: req.session.user || "",
//                     photo: req.session.photo || "",
//                 });
//             } else {
//                 console.log(err);
//             }
//         });
// };

exports.getAdminDashboardProgramas = async (req, res, next) => {
    EntrenamientoModel.fetchAll2()
        .then(([rows, fieldData]) => {
            res.render("adminDashboardProgramas", {
                programa: rows,
                pagetitle: "adminProgramas",
                user: req.session.user || "",
                path: "/adminDashboardProgramas",
                photo: req.session.photo || "",
                csrfToken: req.csrfToken(),
                rol: req.session.rol,
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

// exports.getAdminNuevoEjercicio = (req, res, next) => {
//     res.render("adminNuevoEjercicio", {
//         pagetitle: "Nuevo Ejercicio",
//         user: req.session.user || "",
//         path: "adminNuevoEjercicio",
//         csrfToken: req.csrfToken(),
//         photo: req.session.photo || "",
//     });
// };

exports.getAdminNuevoPrograma = (req, res, next) => {
    res.render("adminNuevoPrograma", {
        pagetitle: "Nuevo Programa",
        user: req.session.user || "",
        csrfToken: req.csrfToken(),
        photo: req.session.photo || "",
        rol: req.session.rol,
    });
};

exports.postAdminNuevoPrograma = (req, res, next) => {
    const programa = new EntrenamientoModel({
        frecuencia: req.body.frecuencia,
        descripcion_programa: req.body.descripcion_programa,
        nombre_programa: req.body.nombre_programa,
        ref_visual: req.body.ref_visual,
        img_programa: req.file.filename,
    });
    programa
        .save()
        .then((result) => {
            res.redirect("/admin/admindashboard/programas");

        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

exports.getAdminEditarPrograma = (req, res, next) => {
    const idPrograma = req.params.id_Programa;
    EntrenamientoModel.fetchById(idPrograma)
        .then(([rows, fieldData]) => {
            res.render("adminEditarPrograma", {
                pagetitle: "Editar Programa",
                user: req.session.user || "",
                programa: rows[0],
                csrfToken: req.csrfToken(),
                photo: req.session.photo || "",
                rol: req.session.rol,
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

exports.postAdminEditarPrograma = (req, res, next) => {
    const idPrograma = req.params.id_Programa;
    const programa = new EntrenamientoModel({
        frecuencia: req.body.frecuencia,
        descripcion_programa: req.body.descripcion_programa,
        nombre_programa: req.body.nombre_programa,
        ref_visual: req.body.ref_visual || null,
        img_programa: req.file.filename || null,
    });
    programa
        .update(idPrograma)
        .then((result) => {
            res.redirect("/admin/admindashboard/programas");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

exports.postAdminEliminarPrograma = (req, res, next) => {
    const idPrograma = req.params.id_Programa;
    EntrenamientoModel
        .deleteById(idPrograma)
        .then(() => {
            // Si se eliminó el programa correctamente, redirigir a la página principal o mostrar un mensaje de éxito
            res.redirect('/admin/admindashboard/programas');
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

exports.getAdminNuevaDieta = (req, res, next) => {
    res.render("adminNuevaDieta", {
        pagetitle: "Nueva Dieta",
        user: req.session.user || "",
        Message: "",
        path: "adminNuevaDieta",
        csrfToken: req.csrfToken(),
        photo: req.session.photo || "",
        rol: req.session.rol,
    });
};

exports.postAdminNuevaDieta = async (req, res, next) => {
    const dieta = new Dieta({
        nombre_dieta: req.body.nombre_dieta,
        calorias: req.body.no_calorias,
        proteinas: req.body.proteinas,
        grasas: req.body.grasas,
        carbohidratos: req.body.carbohidratos,
        fibra_total: req.body.fibra_total,
        ceniza: req.body.ceniza,
        calcio: req.body.calcio,
        fosforo: req.body.fosforo,
        hierro: req.body.hierro,
        tiamina: req.body.tiamina,
        riboflavina: req.body.riboflavina,
        niacina: req.body.niacina,
        vitamina_c: req.body.vitamina_c,
        vitamina_a: req.body.vitamina_a,
        ac_graso_mono: req.body.ac_graso_mono,
        ac_graso_poli: req.body.ac_graso_poli,
        ac_graso_saturado: req.body.ac_graso_saturado,
        colesterol: req.body.colesterol,
        potasio: req.body.potasio,
        sodio: req.body.sodio,
        zinc: req.body.zinc,
        magnesio: req.body.magnesio,
        vit_b6: req.body.vit_b6,
        vit_b12: req.body.vit_b12,
        ac_folico: req.body.ac_folico,
        folato: req.body.folato,
        alimento: req.body.alimento,
        foto_dieta : req.file.filename,
    });


    try {
        // Guarda la instancia de Dieta en la base de datos
        const dietaGuardada = await dieta.save();
        // Redirige al usuario a la página de dietas cuando se haya guardado correctamente
        res.redirect('/admin/admindashboard/diets');
    } catch (error) {
        console.error(error);
        // Maneja el error y renderiza una página de error o envía un mensaje de error al usuario
        res.status(500).send('Error al guardar la dieta y el alimento');
    }
};

exports.getAdminEditarDieta = (req, res, next) => {
    const id_dieta = req.params.id_dieta;
    Dieta.fetchById(id_dieta)
        .then(([rows, fieldData]) => {
            res.render("adminEditarDieta", {
                pagetitle: "Editar Dieta",
                user: req.session.user || "",
                Message: "",
                path: "adminEditarDieta",
                csrfToken: req.csrfToken(),
                photo: req.session.photo || "",
                dieta: rows[0],
                rol: req.session.rol,
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

exports.postAdminEditarDieta = (req, res, next) => {
    const dieta = new Dieta({
        nombre_dieta: req.body.nombre_dieta,
        calorias: req.body.no_calorias,
        proteinas: req.body.proteinas,
        grasas: req.body.grasas,
        carbohidratos: req.body.carbohidratos,
        fibra_total: req.body.fibra_total,
        ceniza: req.body.ceniza,
        calcio: req.body.calcio,
        fosforo: req.body.fosforo,
        hierro: req.body.hierro,
        tiamina: req.body.tiamina,
        riboflavina: req.body.riboflavina,
        niacina: req.body.niacina,
        vitamina_c: req.body.vitamina_c,
        vitamina_a: req.body.vitamina_a,
        ac_graso_mono: req.body.ac_graso_mono,
        ac_graso_poli: req.body.ac_graso_poli,
        ac_graso_saturado: req.body.ac_graso_saturado,
        colesterol: req.body.colesterol,
        potasio: req.body.potasio,
        sodio: req.body.sodio,
        zinc: req.body.zinc,
        magnesio: req.body.magnesio,
        vit_b6: req.body.vit_b6,
        vit_b12: req.body.vit_b12,
        ac_folico: req.body.ac_folico,
        folato: req.body.folato,
        alimento: req.body.alimento,
        foto_dieta : req.file.filename,
    });

    dieta.update(req.params.id_dieta)
        .then(() => {
            res.redirect('/admin/admindashboard/diets');
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
}

exports.postAdminEliminarDieta = (req, res, next) => {
    const id_dieta = req.params.id_dieta;

    Dieta.deleteById(id_dieta)
        .then(() => {
            res.redirect('/admin/admindashboard/diets');
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });

}

// exports.postAdminNuevoEjercicio = (req, res, next) => {
//     const ejercicio = new EjercicioModel({
//         categoria: req.body.categoria,
//         nivel_intensidad: req.body.nivel_intensidad,
//         referencia_visual: req.body.referencia_visual,
//         descripcion_ejercicio: req.body.descripcion_ejercicio,
//         nombre_ejercicio: req.body.nombre_ejercicio,
//         imagen_ejercicio: req.body.imagen_ejercicio,
//     });
//     ejercicio
//         .save()
//         .then((result) => {
//             res.redirect("/admin/admindashboard/ejercicios");
//         })
//         .catch((err) => {
//             if (err.code === "PROTOCOL_CONNECTION_LOST") {
//                 res.render("dbDown", {
//                     pagetitle: "Error",
//                     user: req.session.user || "",
//                     photo: req.session.photo || "",
//                 });
//             } else {
//                 console.log(err);
//             }
//         });
// };

// exports.deleteAdminEjercicio = (req, res, next) => {
//     const id = req.params.id_ejercicio;


//     ProgramaEjercicio.deleteById(id)
//     EjercicioModel.deleteById(id)
//         .then(([rows, fieldData]) => {
//             req.flash("success", "Se elimino ejercicio");
//             res.redirect("/admin/admindashboard/ejercicios");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

exports.getAdminDashboardAddUser = (req, res, next) => {
    const id = req.params.email || "";

    Rol.fetchAllButUsers()
        .then(([rows]) => {
            res.render("adminNuevoUsuario", {
                pagetitle: "Agregar usuario",
                user: req.session.user || "",
                roles: rows,
                csrfToken: req.csrfToken(),
                mensaje: "",
                email: req.body.email,
                photo: req.session.photo || "",
                id: id || "",
                rol: "",
                usuario: "",
                rol: req.session.rol,
            });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });   
};

exports.getAdminDashboardModUser = async (req, res, next) => {
    const id = req.params.email;

    const consultaRoles = await Rol.fetchAllButUsers();
    const roles = consultaRoles[0];

    RolUsuario.fetch(id)
        .then(([rows, fieldData]) => {
            const mensaje = "Usuario actualizado correctamente";
            Rol.fetch(rows[0].id_rol)
                .then(([rows2, fieldData]) => {
                    res.render("adminNuevoUsuario", {
                        pagetitle: "Modificar usuario",
                        user: req.session.user || "",
                        usuario: rows[0],
                        rol: rows2[0],
                        csrfToken: req.csrfToken(),
                        mensaje: mensaje,
                        photo: req.session.photo || "",
                        roles: roles,
                        rol: req.session.rol,
                    });
                })
                .catch((err) => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            photo: req.session.photo || "",
                            csrfToken: req.csrfToken(),
                            rol: req.session.rol,
                        });
                    } else {
                        response.render("error", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            rol: req.session.rol || "",
                            photo: req.session.photo || 'default.png',
                        });
                    }
                    next(err);
                });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
            next(err);
        });
};

exports.postAdminDashboardModUser = (req, res, next) => {
    const id = req.params.email;
    const rol = req.body.role;

    RolUsuario.update(id, rol)
        .then(() => {
            const mensaje = "Usuario actualizado correctamente";
            res.redirect("/admin/admindashboard/userprivileges");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
            next(err);
        });
};

exports.postAdminDashboardAddUser = async (req, res, next) => {
    const email = req.body.email;
    const role = req.body.role;

    try {
        // Check if user exists
        const [users] = await usuario.fetch(email);
        if (!users.length) {
            return res.render("adminNuevoUsuario", {
                pagetitle: "Agregar usuario",
                user: req.session.user || "",
                email: email,
                roles: await Rol.fetchAll(),
                csrfToken: req.csrfToken(),
                mensaje: "Usuario no registrado",
                photo: req.session.photo || "",
                rol: req.session.rol,
                usuario: "",
            });
        }

        // Delete the email from the rol_usuario table and add it again
        RolUsuario.delete(email);
        const modificar = new RolUsuario(role, email);

        modificar
            .save()
            .then((result) => {
                res.redirect("/admin/admindashboard/userprivileges");
            })
            .catch((err) => {
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    res.render("dbDown", {
                        pagetitle: "Error",
                        user: req.session.user || "",
                        photo: req.session.photo || "",
                        rol: req.session.rol,
                    });

                } else {
                    response.render("error", {
                        pagetitle: "Error",
                        user: req.session.user || "",
                        rol: req.session.rol || "",
                        photo: req.session.photo || 'default.png',
                    });
                }
            });
    } catch (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            res.render("dbDown", {
                pagetitle: "Error",
                user: req.session.user || "",
                photo: req.session.photo || "",
                csrfToken: req.csrfToken(),
                rol: req.session.rol,
            });
        } else {
            response.render("error", {
                pagetitle: "Error",
                user: req.session.user || "",
                rol: req.session.rol || "",
                photo: req.session.photo || 'default.png',
            });
        }
        res.redirect("/");
    }
};

exports.deleteAdminDashboardUser = (req, res, next) => {
    const email = req.params.email;


    RolUsuario.deleteById(email)
        .then(([rows, fieldData]) => {
            req.flash("success", "Se elimino usuario");
            res.redirect("/admin/admindashboard/userprivileges");
        })
        .catch((err) => {
            response.render("error", {
                pagetitle: "Error",
                user: req.session.user || "",
                rol: req.session.rol || "",
                photo: req.session.photo || 'default.png',
            });
        });
};

exports.getAdminDashboardDietas = async (req, res, next) => {
    Alimento.fetchAll()
        .then(([alimentoRows, alimentoFields]) => {
            Dieta.fetchAll()
                .then(([dietaRows, dietaFields]) => {
                    res.render("adminDashboardDietas", {
                        alimento: alimentoRows,
                        dieta: dietaRows,
                        pagetitle: "Catálogo de Dietas",
                        csrfToken: req.csrfToken(),
                        user: req.session.user || "",
                        path: "/adminDashboardDietas",
                        photo: req.session.photo || "",
                        rol: req.session.rol,
                    });
                })
                .catch((err) => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            photo: req.session.photo || "",
                        });
    
                    } else {
                        response.render("error", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            rol: req.session.rol || "",
                            photo: req.session.photo || 'default.png',
                        });
                    }
                });
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

exports.getAdminDashboardPrivileges = (req, res, next) => {
    let results = [];

    usuario
        .getPrivilegios()
        .then((rows) => {
            console.log(rows);
            rows.forEach((row) => {
                results.push(row);
            });
            res.render("adminDashboardPrivileges", {
                usersArray: rows[0],
                pagetitle: "Users",
                user: req.session.user || "",
                csrfToken: req.csrfToken(),
                photo: req.session.photo || "",
                rol: req.session.rol,
            });
        })
        .catch((error) => {
            if (error.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};

exports.getAdminDashboard = async (req, res, next) => {
    const consulta_total_dieta = await Dieta.getTotal();
    const total_dieta = consulta_total_dieta[0][0].total;
    const consulta_total_ejercicio = await EjercicioModel.getTotal();
    const total_ejercicio = consulta_total_ejercicio[0][0].total;
    const consulta_total_cliente = await Cliente.getTotal();
    const total_cliente = consulta_total_cliente[0][0].total;
    const consulta_total_programa = await EntrenamientoModel.getTotal();
    const total_programa = consulta_total_programa[0][0].total;
    const conslta_total_roles = await Rol.getTotal();
    const total_roles = conslta_total_roles[0][0].total;

    res.render("adminDashboard", {
        pagetitle: "Admin dashboard",
        user: req.session.user || "",
        total_dieta: total_dieta || "",
        total_ejercicio: total_ejercicio || "",
        total_cliente: total_cliente || "",
        total_programa: total_programa || "",
        total_roles: total_roles || "",
        csrfToken: req.csrfToken(),
        photo: req.session.photo || "",
        rol: req.session.rol,
    });
};

exports.getAdminModRol = (req, res, next) => {
    const rol = req.params.id;
    let roles = [];
    let privileges = [];
    let rolPrivilegio = [];

    Privilegio.fetchAll()
        .then(privilegesRows => {
            privileges = privilegesRows;
            return Rol.fetchAll();
        })
        .then(rolesRows => {
            roles = rolesRows;

            // Fetch all rolPrivilegio records
            return RolPrivilegio.getByIdRol(rol);
        })
        .then(rolPrivilegioRows => {
            rolPrivilegio = rolPrivilegioRows;

            res.render("modrol", {
                roles: roles[0],
                privileges: privileges[0],
                rolPrivilegio: rolPrivilegio[0], // Pass the rolPrivilegio array to the view
                id: rol,
                pagetitle: "Modificar rol",
                user: req.session.user || "",
                csrfToken: req.csrfToken(),
                photo: req.session.photo || "",
                rol: req.session.rol,
            });
        })
        .catch(error => {
            if (error.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });

};

exports.postAdminModRol = (req, res, next) => {
    const id = req.params.id;
    let privilegesB = req.body.privileges;
    let privileges = Array.isArray(privilegesB)
    ? privilegesB
    : [privilegeosB];
    var rolPrivilegioNuevo;

    // Set privileges to an empty array if it is undefined or null
    if (privileges && privileges[0] === undefined) {
        console.log(privileges);
        privileges = [];
    }
    // Delete existing RolPrivilegio records for the given idRol
    RolPrivilegio.deleteByRol(id)
        .then(() => {
            console.log(privileges);
            // Only continue if privileges have a length greater than 0
            if (!privileges.length) {
                res.redirect('/admin/adminDashboard/modrol/' + id);
                return;
            }

            // Insert new RolPrivilegio records for each privilege in the array
            privileges.forEach((privilege) => {
                rolPrivilegioNuevo = new RolPrivilegio(id, privilege);
                rolPrivilegioNuevo.save();
            });
            res.redirect('/admin/adminDashboard/modrol/' + id);
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
            next(err);
        });
};

// exports.getAdminModAlimento = (req, res, next) => {
//     const id = req.params.id;
//     Alimento.fetchOne(id)
//         .then(([rows]) => {
//             const alimento = rows[0];
//             res.render("adminModificarAlimento", {
//                 pagetitle: "Modificar alimento",
//                 user: req.session.user || "",
//                 id: id,
//                 csrfToken: req.csrfToken(),
//                 Message: "",
//                 photo: req.session.photo || "",
//                 alimento: alimento
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             next(err);
//         });
// };


// exports.postAdminModAlimento = (req, res, next) => {
//     const id = req.params.id;
//     const descripcion = req.body.descripcion_alimento;
//     const unidad = req.body.unidad;
//     const cantidad = req.body.cantidad;

//     Alimento.update(id, descripcion, unidad, cantidad)
//         .then(() => {
//             const mensaje = "Alimento actualizado correctamente";
//             // Fetch the updated alimento from the database and render the view with its values as default content
//             Alimento.fetchOne(id)
//                 .then(([rows]) => {
//                     const alimento = rows[0];
//                     res.render("adminModificarAlimento", {
//                         pagetitle: "Modificar alimento",
//                         user: req.session.user || "",
//                         id: id,
//                         csrfToken: req.csrfToken(),
//                         Message: mensaje,
//                         photo: req.session.photo || "",
//                         alimento: alimento  // Add the updated alimento to the view
//                     });
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     next(err);
//                 });
//         })
//         .catch((err) => {
//             console.log(err);
//             next(err);
//         });
// };

// exports.getAdminDeleteAlimento = (req, res, next) => {
//     const id = req.params.id;

//     DietaAlimento.delete(id) // delete associated records in dieta_alimento table
//         .then(() => {
//             return Alimento.delete(id); // delete record from alimento table
//         })
//         .then(() => {
//             res.redirect("/admin/adminDashboard/diets");
//         })
//         .catch((err) => {
//             console.log(err);
//             next(err);
//         });
// };

exports.getadminreg_rol = (req, res, next) => {
    const mensaje =
        req.query.mensaje === "success" ? "Rol registrado correctamente." : "";

    Rol.fetchAll()
        .then(([rows]) => {
            const csrfToken = req.csrfToken();
            const roles = rows.map(row => {
                return { id: row.id_rol, nombre: row.nombreRol };
            });

            // Busca todos los privilegios
            return Privilegio.fetchAll()
                .then(([privilegios]) => {
                    // Renderiza la vista con los roles y los privilegios
                    res.render('reg_rol', {
                        pagetitle: 'Registrar Rol',
                        mensaje: mensaje,
                        user: req.session.user,
                        roles: rows,
                        privilegios: privilegios, // Añade los privilegios aquí
                        csrfToken: csrfToken,
                        photo: req.session.photo || "",
                        rol: req.session.rol,
                    });
                    res.locals.mensaje = "";
                });
        })
        .catch(err => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            } 
        });
};

exports.postadminreg_rol = function (req, res) {
    const nombreRol = req.body.nombreRol;
    const { id_rol, privilegios } = req.body;
    const ids_casos_uso = Array.isArray(privilegios)
        ? privilegios
        : [privilegios];
    const rol = new Rol({ nombre: nombreRol });
    const email = req.session.email;
    const tipoRol = req.body.id_rol;
    let insertedIdRol;

    rol.save()
        .then(([result]) => {
            req.app.locals.mensaje = "Rol Registrado Correctamente.";
            insertedIdRol = result.insertId;
            const promises = ids_casos_uso.map((id_caso_uso) => {
                if (id_caso_uso) {
                    const trimmedIdCasoUso = id_caso_uso.trim();
                    const rolPrivilegio = new RolPrivilegio(
                        insertedIdRol,
                        trimmedIdCasoUso
                    );
                    console.log(
                        `Creando instancia de RolPrivilegio con id_rol=${insertedIdRol} y id_cu=${trimmedIdCasoUso}`
                    );
                    return rolPrivilegio
                        .save()
                        .then(() =>
                            console.log(
                                `Rol_Privilegio guardado correctamente para id_rol= ${insertedIdRol} e id_cu= ${trimmedIdCasoUso}`
                            )
                        )
                        .catch((error) =>
                            console.error(
                                `Error al guardar Rol_Privilegio para id_rol=${insertedIdRol} e id_cu=${trimmedIdCasoUso}:`,
                                error
                            )
                        );
                }
            });
            return Promise.all(promises);
        })
        .then(() => {
            console.log(`Rol guardado correctamente`);
            res.redirect("/admin/adminDashboard/reg_rol?mensaje=success");
        })
        .catch((error) => {
            console.error(error);
            req.session.mensaje = "Error al registrar el rol.";
        });
};


exports.getAdminInfoCliente = async (req, res, next) => {
    const total = (await Cliente.getTotal())[0][0].total;
    const clientesMujeres = (await Cliente.getTotalMujeres())[0][0].TotalMujeres;
    const clienteHombres = (await Cliente.getTotalHombres())[0][0].TotalHombres;

    res.render("adminDashboardGrafClientes", {
        pagetitle: "Grafica Clientes",
        user: req.session.user || "",
        totalClientes: total || "",
        mujeres: clientesMujeres || "",
        hombres: clienteHombres || "",
        csrfToken: req.csrfToken(),
        photo: req.session.photo || "",
        rol: req.session.rol,
    });
};



exports.deleteAdminRol = (req, res, next) => {
    const idRol = req.params.idrol;

    Rol.deleteById(idRol)
        .then(([rows, fieldData]) => {
            req.session.mensaje = "Rol desactivado correctamente.";
            res.redirect("/admin/admindashboard/reg_rol");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });

};

exports.activateAdminRol = (req, res, next) => {
    const idRol = req.params.idrol;

    Rol.activateById(idRol)
        .then(([rows, fieldData]) => {
            req.session.mensaje = "Rol activado correctamente.";
            res.redirect("/admin/admindashboard/reg_rol");
        })
        .catch((err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || "",
                    csrfToken: req.csrfToken(),
                    rol: req.session.rol,
                });
            } else {
                response.render("error", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    rol: req.session.rol || "",
                    photo: req.session.photo || 'default.png',
                });
            }
        });
};


// exports.getmodificarEjercicio = (req, res, next) => {
//     const id_ejercicio = req.params.id_ejercicio;

//     EjercicioModel.fetchById(id_ejercicio)
//         .then(([rows, fieldData]) => {
//             const mensaje = "";
//             res.render("modificarEjercicio", {
//                 pagetitle: "Modificar ejercicio",
//                 user: req.session.user || "",
//                 ejercicio: rows[0],
//                 csrfToken: req.csrfToken(),
//                 mensaje: mensaje,
//                 photo: req.session.photo || "",
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             next(err);
//         });
// }

// exports.postmodificarEjercicio = (req, res, next) => {

//     const id_ejercicio = req.params.id_ejercicio;

//     const ejercicio = new EjercicioModel({
//         categoria: req.body.categoria,
//         nivel_intensidad: req.body.nivel_intensidad,
//         referencia_visual: req.body.referencia_visual,
//         descripcion_ejercicio: req.body.descripcion_ejercicio,
//         nombre_ejercicio: req.body.nombre_ejercicio,
//         imagen_ejercicio: req.body.imagen_ejercicio,
//     });
//     ejercicio
//         .updateById(id_ejercicio)
//         .then(([rows, fieldData]) => {
//             req.session.mensaje = "Ejercicio modificado correctamente.";
//             res.redirect("/admin/admindashboard/ejercicios");
//         })
//         .catch((err) => {
//             if (err.code === "PROTOCOL_CONNECTION_LOST") {
//                 res.render("dbDown", {
//                     pagetitle: "Error",
//                     user: req.session.user || "",
//                     photo: req.session.photo || "",
//                 });
//             } else {
//                 console.log(err);
//             }
//         });
// };

// exports.getGraficaEjercicios = async (req, res, next) => {

//     try {
//         const hipertrofiaCount = (await EjercicioModel.getTotalHipertrofia())[0][0].total;
//         const fuerzaCountQuery = (await EjercicioModel.getTotalFuerza())[0][0].total;
//         const resistenciaCount = (await EjercicioModel.getTotalPull())[0][0].total; 
//         const pushCount = (await EjercicioModel.getTotalPush())[0][0].total; 
//         const pullCount = (await EjercicioModel.getTotalPull())[0][0].total;
  
//         res.render("graficaEjercicios", {
//             pagetitle: "Grafica Ejercicios",
//             user: req.session.user || 0,
//             hipertrofiaCount: hipertrofiaCount || 0,
//             fuerzaCount: fuerzaCountQuery || 0,
//             resistenciaCount: resistenciaCount || 0,
//             pushCount: pushCount || 0,
//             pullCount: pullCount || 0,
//             photo: req.session.photo || "",
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// };

// exports.getAdminAddAlimento = (req, res, next) => {
//     res.render("adminNuevoAlimento", {
//         pagetitle: "Nuevo alimento",
//         user: req.session.user || "",
//         photo: req.session.photo || "",
//         csrfToken: req.csrfToken(),
//     });
// };

