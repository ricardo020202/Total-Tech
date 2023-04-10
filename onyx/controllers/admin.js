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
const Rol = require('../models/rol');
const usuario = require("../models/usuario");
const RolUsuario = require('../models/rol_usuario');

exports.getAdminDashboardEjercicios= async (req, res, next) => {
    EjercicioModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("adminDashboardEjercicio", {
                ejercicio: rows,
                pagetitle: "adminEjercicios",
                user: req.session.user || "",
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

exports.getAdminDashboardProgramas= async (req, res, next) => {
    EntrenamientoModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("adminDashboardProgramas", {
                programa: rows,
                pagetitle: "adminProgramas",
                user: req.session.user || "",
                path: "/adminDashboardProgramas",
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

exports.getAdminNuevoEjercicio = (req, res, next) => {
    res.render("adminNuevoEjercicio", {
        pagetitle: "Nuevo Ejercicio",
        user: req.session.user || "",
        path: "adminNuevoEjercicio",
        csrfToken: req.csrfToken(),
    });
};

exports.getAdminNuevoPrograma = (req, res, next) => {
    res.render("adminNuevoPrograma", {
        pagetitle: "Nuevo Programa",
        user: req.session.user || "",
        csrfToken: req.csrfToken(),
    });
};

exports.postAdminNuevoPrograma = (req, res, next) => {
    const programa = new EntrenamientoModel({
        frecuencia: req.body.frecuencia,
        descripcion_programa: req.body.descripcion_programa,
        nombre_programa: req.body.nombre_programa,
        ref_visual: req.body.ref_visual,
        img_programa: req.body.img_programa,
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
                });
                return { medidas: [], fechas: [] };
            } else {
                console.log(err);
            }
        });
};

exports.getAdminNuevaDieta = (req, res, next) => {
    res.render("adminNuevaDieta", {
        pagetitle: "Nueva Dieta",
        user: req.session.user || "",
        path: "adminNuevaDieta",
        csrfToken: req.csrfToken(),
    });
};

exports.postAdminNuevaDieta = (req, res, next) => {
    const dieta = new Dieta({
        nombre_dieta: req.body.nombre_dieta,
        no_calorias: req.body.no_calorias,
        proteinas: req.body.proteinas,
        carbohidratos: req.body.carbohidratos,
        grasas: req.body.grasas,
        micronutrientes: req.body.micronutrientes,
        macronutrientes: req.body.macronutrientes,
    });

    const alimento = new Alimento({
        descripcion: req.body.descripcion_alimento,
        unidad: req.body.unidad,
        cantidad: req.body.cantidad,
    });

    if (dieta) {
           dieta
    .save()
    .then((result) => {
        res.redirect("/admin/admindashboard/diets");
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
    }
    if (alimento) {
        alimento
    .save()
    .then((result) => {
        res.redirect("/admin/admindashboard/diets");
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
    }
    );
};
};    

exports.postAdminNuevoEjercicio = (req, res, next) => {
    const ejercicio = new EjercicioModel({
        categoria: req.body.categoria,
        nivel_intensidad: req.body.nivel_intensidad,
        referencia_visual: req.body.referencia_visual,
        descripcion_ejercicio: req.body.descripcion_ejercicio,
        nombre_ejercicio: req.body.nombre_ejercicio,
        imagen_ejercicio: req.body.imagen_ejercicio,
    });
    ejercicio
        .save()
        .then((result) => {
            res.redirect("/admin/admindashboard/ejercicios");
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

exports.getAdminDashboardAddUser = (req, res, next) => {
    Rol.fetchAll()
        .then(([rows]) => {

            res.render("adminNuevoUsuario", {
                pagetitle: "Agregar usuario",
                user: req.session.user || "",
                roles: rows,
                csrfToken: req.csrfToken(),
                mensaje: ""
            });
        })
        .catch(err => console.log(err));
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
          roles: await Rol.fetchAll(),
          csrfToken: req.csrfToken(),
          mensaje: "Usuario no registrado"
        });
      }
  
      // Delete the email from the rol_usuario table and add it again
      RolUsuario.delete(email);
      const modificar = new RolUsuario(role, email);

      modificar
      .save()
      .then((result) => {
            res.render("adminNuevoUsuario", {
            pagetitle: "Agregar usuario",
            user: req.session.user || "",
            roles: Rol.fetchAll(),
            csrfToken: req.csrfToken(),
            mensaje: "Usuario agregado exitosamente"
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
  
      
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
};

exports.deleteAdminDashboarUser = (req, res, next) => {
    const email = req.params.email;

    usuario.deleteById(email)
        .then(([result]) => {
            req.flash("success", "Se elimino usuario");
            res.redirect("/onyx/admindashboard");
        })
        .catch((err) => {
            console.log(err);
        });

    res.locals.messeges = req.flash();
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
        res.render("adminDashboardPrivileges", {
            usersArray:results[0],
            pagetitle: "Users",
            user: req.session.user || "",
            csrfToken: req.csrfToken(),
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
};

exports.getAdminDashboard = (req, res, next) => {
    res.render("admindashboard", {
        pagetitle: "Admin dashboard",
        user: req.session.user || "",
    });
};