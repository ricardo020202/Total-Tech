const user = require("../models/usuario");
const cliente = require("../models/cliente");
const bcrypt = require("bcryptjs");

exports.get_signup = (req, res, next) => {
    res.render("signUp", {
        pagetitle: "Sign up",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user || "",
        photo: req.session.photo || 'default.pn',
        csrfToken: req.csrfToken(),
        mensaje: req.session.mensaje || "",
        
    });
};

exports.post_signup = async (req, res, next) => {
    const user_nuevo = new user({
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        contraseña: req.body.password,
        user_pic: 'default.png',
    });
    user_nuevo
        .save()
        .then(([rows, fieldData]) => {
            req.session.mensaje = "Usuario registrado.";
            // Loguear al usuario recién registrado
            user.fetch(req.body.email)
                .then(([rows, fieldData]) => {
                    req.session.photo = rows[0].user_pic;
                    if (rows.length > 0) {
                        bcrypt
                            .compare(req.body.password, rows[0].contraseña)
                            .then((doMatch) => {
                                if (doMatch) {
                                    req.session.isLoggedIn = true;
                                    req.session.user = rows[0].nombre;
                                    req.session.email = rows[0].email;
                                    user.addRol(req.body.email, 2, new Date())
                                        .then(([rows, fieldData]) => {
                                            user.getPrivilegiosOne(req.session.email)
                                                .then(([consulta_privilegios, fieldData]) => {
                            
                                                    const privilegios = [];
                                                    for (let privilegio of consulta_privilegios) {
                                                        privilegios.push(privilegio.nombrecu);
                                                    }
                                                
                                                    request.session.privilegios = privilegios;

                                                    return req.session.save((err) => {
                                                        res.redirect("/onyx/registrar-datos-iniciales"); // redirigir al usuario a la página de /onyx/registrar-datos-iniciales
                                                    });
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    if (err.code === "ER_DUP_ENTRY") {
                                                        req.session.mensaje = "El correo electrónico ya está registrado.";
                                                        res.redirect("/users/signup");
                                                    } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                                                        req.session.mensaje = "Error Completar Registro.";
                                                        res.redirect("/users/signUp");
                                                    } else {
                                                        res.render("dbDown", {
                                                            pagetitle: "Error",
                                                            user: req.session.user || "",
                                                        });
                                                    }
                                                });
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            if (err.code === "ER_DUP_ENTRY") {
                                                req.session.mensaje = "Usuario y/o contraseña incorrecta.";
                                                res.redirect("/users/signup");
                                            } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                                                req.session.mensaje = "Error Completar Registro.";
                                                res.redirect("/users/signUp");
                                            } else {
                                                res.render("dbDown", {
                                                    pagetitle: "Error",
                                                    user: req.session.user || "",
                                                });
                                            }
                                        });
                                } else {
                                    request.session.mensaje = "Usuario y/o contraseña incorrecta.";
                                    response.redirect("/users/login");
                                    
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                if (err.code === "ER_DUP_ENTRY") {
                                    req.session.mensaje = "El correo electrónico ya está registrado.";
                                    res.redirect("/users/signup");
                                } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                                    req.session.mensaje = "Error Completar Registro.";
                                    res.redirect("/users/signUp");
                                } else {
                                    res.render("dbDown", {
                                        pagetitle: "Error",
                                        user: req.session.user || "",
                                    });
                                }
                            });
                    } else {
                        req.session.mensaje = "Usuario no registrado.";
                        res.redirect("/users/login");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (err.code === "ER_DUP_ENTRY") {
                        req.session.mensaje = "Usuario y/o contraseña incorrecta.";
                        res.redirect("/users/signup");
                    } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        req.session.mensaje = "Error Completar Registro.";
                        res.redirect("/users/signUp");
                    } else {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                        });
                    }
                });
        })
        .catch((err) => {
            console.log(err);
            if (err.code === "ER_DUP_ENTRY") {
                req.session.mensaje = "Usuario y/o contraseña incorrecta.";
                res.redirect("/users/signup");
            } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                req.session.mensaje = "Error Completar Registro.";
                res.redirect("/users/signUp");
            } else {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    
                });
            }
        });
};

exports.login = (req, res, next) => {
    let mensaje = "";
    if (req.session.mensaje) {
        mensaje = req.session.mensaje;
        req.session.mensaje = "";
    }

    res.render("login", {
        pagetitle: "Login",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user || "",
        mensaje: mensaje,
        csrfToken: req.csrfToken(),
        photo: req.session.photo || 'default.png',
    });
};

exports.post_login = (req, res, next) => {
    user.getRol(req.body.email)
        .then(([rows, fieldData]) => {
            req.session.rol = rows[0].nombreRol;
        })
        .catch((err) => {
            console.log(err);
        });
    user.fetch(req.body.email)
        .then(([rows, fieldData]) => {
            req.session.photo = rows[0].user_pic;
            if (rows.length > 0) {
                bcrypt
                    .compare(req.body.password, rows[0].contraseña)
                    .then((doMatch) => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.user = rows[0].nombre;
                            req.session.email = rows[0].email;
                            user.getPrivilegiosOne(rows[0].email)
                                .then(([consulta_privilegios, fieldData]) => {
                                    const privilegios = [];
                                    for (let privilegio of consulta_privilegios) {
                                        privilegios.push(privilegio.nombrecu);
                                    }
                                    request.session.privilegios = privilegios;

                                    return req.session.save((err) => {
                                        cliente.fetchOne(req.session.email)
                                            .then(([rows, fieldData]) => {
                                                if (rows.length === 0 && req.session.rol === "cliente") {
                                                    return res.redirect("/onyx/registrar-datos-iniciales");
                                                }
                                                else {
                                                    res.redirect("/admin/adminDashboard");
                                                }
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                if (err.code === "ER_DUP_ENTRY") {
                                                    req.session.mensaje = "El correo electrónico ya está registrado.";
                                                    res.redirect("/users/signup");
                                                } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                                                    req.session.mensaje = "Error Completar Registro.";
                                                    res.redirect("/users/signUp");
                                                } else {
                                                    res.render("dbDown", {
                                                        pagetitle: "Error",
                                                        user: req.session.user || "",
                                                    });
                                                }
                                            });
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    if (err.code === "ER_DUP_ENTRY") {
                                        req.session.mensaje = "El correo electrónico ya está registrado.";
                                        res.redirect("/users/signup");
                                    } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                                        req.session.mensaje = "Error Completar Registro.";
                                        res.redirect("/users/signUp");
                                    } else {
                                        res.render("dbDown", {
                                            pagetitle: "Error",
                                            user: req.session.user || "",
                                        });
                                    }
                                });
                        } else {
                            req.session.mensaje =
                                "Usuario y/o contraseña incorrecta.";
                            if (req.session.rol === "administrador") {
                                res.redirect("/admin/adminDashboard");
                            } else if (req.session.rol === "cliente") {
                                res.redirect("/users/login");
                            }
                            
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.code === "ER_DUP_ENTRY") {
                            req.session.mensaje = "El correo electrónico ya está registrado.";
                            res.redirect("/users/signup");
                        } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                            req.session.mensaje = "Error Completar Registro.";
                            res.redirect("/users/signUp");
                        } else {
                            res.render("dbDown", {
                                pagetitle: "Error",
                                user: req.session.user || "",
                            });
                        }
                    });
            } else {
                req.session.mensaje = "Usuario no registrado.";
                res.redirect("/users/login");
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.code === "ER_DUP_ENTRY") {
                req.session.mensaje = "El correo electrónico ya está registrado.";
                res.redirect("/users/signup");
            } else if (err.code === "PROTOCOL_CONNECTION_LOST") {
                req.session.mensaje = "Error Completar Registro.";
                res.redirect("/users/signUp");
            } else {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                });
            }
        });
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/users/login");
    });
};
