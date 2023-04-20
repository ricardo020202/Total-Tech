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
const RolPrivilegio = require('../models/rol_privilegio');
const Privilegio = require('../models/privilegio');
const db = require('../util/database');

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

exports.getAdminEditarPrograma = (req, res, next) => {
    const idPrograma = req.params.id_Programa;
    console.log(idPrograma);
    EntrenamientoModel.fetchById(idPrograma)
        .then(([rows, fieldData]) => {
            res.render("adminEditarPrograma", {
                pagetitle: "Editar Programa",
                user: req.session.user || "",
                programa: rows[0],
                csrfToken: req.csrfToken(),
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

exports.postAdminEditarPrograma = (req, res, next) => {
    const idPrograma = req.params.id_Programa;
    const programa = new EntrenamientoModel({
        frecuencia: req.body.frecuencia,
        descripcion_programa: req.body.descripcion_programa,
        nombre_programa: req.body.nombre_programa,
        ref_visual: req.body.ref_visual,
        img_programa: req.body.img_programa,
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
    Rol.fetchAllButUsers()
        .then(([rows]) => {

            res.render("adminNuevoUsuario", {
                pagetitle: "Agregar usuario",
                user: req.session.user || "",
                roles: rows,
                csrfToken: req.csrfToken(),
                mensaje: "",
                email: req.params.email,
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

    console.log(email);

    RolUsuario.deleteById(email)
        .then(([rows, fieldData]) => {
            req.flash("success", "Se elimino usuario");
            res.redirect("/admin/admindashboard/userprivileges");
        })
        .catch((err) => {
            console.log(err);
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
        res.render("adminDashboardPrivileges", {
            usersArray:rows[0],
            pagetitle: "Users",
            user: req.session.user || "",
            csrfToken: req.csrfToken(),
        });
      })
      .catch(error => {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
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

exports.getAdminDashboard = async (req, res, next) => {
    const consulta_total_dieta = await Dieta.getTotal();
    const total_dieta = consulta_total_dieta[0][0].total;
    const consulta_total_ejercicio = await EjercicioModel.getTotal();
    const total_ejercicio = consulta_total_ejercicio[0][0].total;
    const consulta_total_cliente = await Cliente.getTotal();
    const total_cliente = consulta_total_cliente[0][0].total;
    const consulta_total_programa = await EntrenamientoModel.getTotal();
    const total_programa = consulta_total_programa[0][0].total;

    res.render("admindashboard", {
        pagetitle: "Admin dashboard",
        user: req.session.user || "",
        total_dieta: total_dieta || "",
        total_ejercicio: total_ejercicio || "",
        total_cliente: total_cliente || "",
        total_programa: total_programa || "",
        csrfToken: req.csrfToken()
    });
};

exports.getAdminModRol = (req, res, next) => {
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
        return RolPrivilegio.fetchAll();
      })
      .then(rolPrivilegioRows => {
        rolPrivilegio = rolPrivilegioRows;
  
        console.log(roles[0]);
        console.log(privileges[0]);
        console.log(rolPrivilegio[0]);
  
        res.render("modrol", {
          roles: roles[0],
          privileges: privileges[0],
          rolPrivilegio: rolPrivilegio[0], // Pass the rolPrivilegio array to the view
          pagetitle: "Modificar rol",
          user: req.session.user || "",
          csrfToken: req.csrfToken()
        });
      })
      .catch(error => {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          res.render("dbDown", {
            pagetitle: "Error",
            user: req.session.user || "",
          });
        } else {
          console.log(error);
        }
      });    
  };
  
exports.postAdminModRol = (req, res, next) => {
    const idRol = req.body.rol;
    const privileges = req.body['privilege[]'];
  
    // Delete existing RolPrivilegio records for the given idRol
    RolPrivilegio.deleteByRol(idRol)
      .then(() => {
        // Insert new RolPrivilegio records for each privilege in the array
        privileges.forEach((privilege) => {
          const rolPrivilegio = new RolPrivilegio(idRol, privilege);
          rolPrivilegio.save();
        });
        res.redirect('/admin/adminDashboard/modrol');
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };
  
exports.getadminreg_rol = (req, res, next) => {
    const mensaje = req.query.mensaje === 'success' ? 'Rol registrado correctamente.' : '';

    Rol.fetchAll()
      .then(([rows]) => {
        const csrfToken = req.csrfToken();
        const roles = rows.map(row => {
        return {id: row.id_rol, nombre: row.nombreRol};
        });

        
        res.render('reg_rol', { 

          pagetitle: 'Registrar Rol',
          mensaje: mensaje, 
          user: req.session.email,
          roles: rows ,
          csrfToken: csrfToken

        });
        res.locals.mensaje = "";
      })
      .catch(err => console.log(err));

  };

exports.postadminreg_rol = function (req, res) {
    const nombreRol = req.body.nombreRol;
    const { id_rol, privilegios } = req.body;
    const ids_casos_uso = Array.isArray(privilegios) ? privilegios : [privilegios];
    const rol = new Rol({nombre: nombreRol});
    const email = req.session.email;
    const tipoRol = req.body.id_rol;
    let insertedIdRol;
    

    rol.save()
        .then(([result]) => {
            req.app.locals.mensaje = "Rol Registrado Correctamente.";
            insertedIdRol = result.insertId;
            const promises = ids_casos_uso.map((id_caso_uso) => {
                const rolPrivilegio = new RolPrivilegio(insertedIdRol, id_caso_uso.trim());
                console.log(`Creando instancia de RolPrivilegio con id_rol=${insertedIdRol} y id_cu=${id_caso_uso.trim()}`);
                return rolPrivilegio.save()
                    .then(() => console.log(`Rol_Privilegio guardado correctamente para id_rol= ${insertedIdRol} e id_cu= ${id_caso_uso.trim()}`))
                    .catch((error) => console.error(`Error al guardar Rol_Privilegio para id_rol=${insertedIdRol} e id_cu=${id_caso_uso.trim()}:`, error));
            });
            return Promise.all(promises);
        })
        .then(() => {
            console.log(`Rol guardado correctamente`);
            res.redirect('/admin/adminDashboard/reg_rol?mensaje=success');
        })
        .catch((error) => {
            console.error(error);
            req.session.mensaje = "Error al registrar el rol.";
        });
};

exports.getAdminInfoCliente = async (req, res, next) => {
    const consulta_total_cliente = await Cliente.getTotal();
    const totalClientes = consulta_total_cliente[0][0].total;
    const consulta_total_mujeres = await Cliente.getTotalMujeres();
    const clientesMujeres = consulta_total_mujeres[0][0].total;
    const consulta_total_hombres = await Cliente.getTotalHombres();
    const clienteHombres = consulta_total_hombres[0][0].total;

    res.render("adminDashboardGrafClientes", {
        pagetitle: "Grafica Clientes",
        user: req.session.user || "",
        totalClientes: totalClientes || "",
        clientesMujeres: clientesMujeres || "",
        clienteHombres: clienteHombres || "",
        csrfToken: req.csrfToken()
    });
};