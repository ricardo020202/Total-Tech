const user = require("../models/usuario");
const cliente = require("../models/cliente");
const bcrypt = require("bcryptjs");

exports.get_signup = (request, response, next) => {
    response.render("signUp", {
        pagetitle: "Sign up",
        isLoggedIn: request.session.isLoggedIn || false,
        user: request.session.user || "",
        photo: request.session.photo || 'default.pn',
        csrfToken: request.csrfToken(),
        mensaje: request.session.mensaje || "",

    });
};

exports.post_signup = async (request, response, next) => {
    const user_nuevo = new user({
        email: request.body.email,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        contraseña: request.body.password,
        user_pic: 'default.png',
    });
    user_nuevo
        .save()
        .then(([rows, fieldData]) => {
            request.session.mensaje = "Usuario registrado.";
            // Loguear al usuario recién registrado
            user.fetch(request.body.email)
                .then(([rows, fieldData]) => {
                    if (rows.length > 0) {
                        request.session.photo = rows[0].user_pic;
                        bcrypt
                            .compare(request.body.password, rows[0].contraseña)
                            .then((doMatch) => {
                                if (doMatch) {
                                    request.session.isLoggedIn = true;
                                    request.session.user = rows[0].nombre;
                                    request.session.email = rows[0].email;
                                    user.addRol(request.body.email, 2, new Date())
                                        .then(([rows, fieldData]) => {
                                            user.getPrivilegiosOne(request.session.email)
                                                .then(([consulta_privilegios, fieldData]) => {
                                                    console.log(consulta_privilegios);
                                                    const privilegios = [];
                                                    for (let privilegio of consulta_privilegios) {
                                                        privilegios.push(privilegio.nombrecu);
                                                    }
                                                    console.log(privilegios);
                                                    request.session.privilegios = privilegios;

                                                    return request.session.save((error) => {
                                                        response.redirect("/onyx/registrar-datos-iniciales"); // redirigir al usuario a la página de /onyx/registrar-datos-iniciales
                                                    });
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    if (error.code === "ER_DUP_ENTRY") {
                                                        request.session.mensaje = "El correo electrónico ya está registrado.";
                                                        response.redirect("/users/signup");
                                                    } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                                                        request.session.mensaje = "Error Completar Registro.";
                                                        response.redirect("/users/signUp");
                                                    } else {
                                                        response.render("dbDown", {
                                                            pagetitle: "Error",
                                                            user: request.session.user || "",
                                                        });
                                                    }
                                                });
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            if (error.code === "ER_DUP_ENTRY") {
                                                request.session.mensaje = "El correo electrónico ya está registrado.";
                                                response.redirect("/users/signup");
                                            } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                                                request.session.mensaje = "Error Completar Registro.";
                                                response.redirect("/users/signUp");
                                            } else {
                                                response.render("dbDown", {
                                                    pagetitle: "Error",
                                                    user: request.session.user || "",
                                                });
                                            }
                                        });
                                } else {
                                    request.session.mensaje = "Usuario y/o contraseña incorrecta.";
                                    response.redirect("/users/login");
                                    console.log(rows);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                if (error.code === "ER_DUP_ENTRY") {
                                    request.session.mensaje = "El correo electrónico ya está registrado.";
                                    response.redirect("/users/signup");
                                } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                                    request.session.mensaje = "Error Completar Registro.";
                                    response.redirect("/users/signUp");
                                } else {
                                    response.render("dbDown", {
                                        pagetitle: "Error",
                                        user: request.session.user || "",
                                    });
                                }
                            });
                    } else {
                        request.session.mensaje = "Usuario y/o contraseña incorrecta.";
                        response.redirect("/users/login");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.code === "ER_DUP_ENTRY") {
                        request.session.mensaje = "El correo electrónico ya está registrado.";
                        response.redirect("/users/signup");
                    } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                        request.session.mensaje = "Error Completar Registro.";
                        response.redirect("/users/signUp");
                    } else {
                        response.render("dbDown", {
                            pagetitle: "Error",
                            user: request.session.user || "",
                        });
                    }
                });
        })
        .catch((error) => {
            console.log(error);
            if (error.code === "ER_DUP_ENTRY") {
                request.session.mensaje = "El correo electrónico ya está registrado.";
                response.redirect("/users/signup");
            } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                request.session.mensaje = "Error Completar Registro.";
                response.redirect("/users/signUp");
            } else {
                response.render("dbDown", {
                    pagetitle: "Error",
                    user: request.session.user || "",

                });
            }
        });
};

exports.login = (request, response, next) => {
    let mensaje = "";
    if (request.session.mensaje) {
        mensaje = request.session.mensaje;
        request.session.mensaje = "";
    }

    response.render("login", {
        pagetitle: "Login",
        isLoggedIn: request.session.isLoggedIn || false,
        user: request.session.user || "",
        mensaje: mensaje,
        csrfToken: request.csrfToken(),
        photo: request.session.photo || 'default.png',
    });
};

exports.post_login = (request, response, next) => {
    user.fetch(request.body.email)
        .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                request.session.photo = rows[0].user_pic;

                user.getRol(request.body.email)
                    .then(([rows, fieldData]) => {
                        request.session.rol = rows[0].nombreRol;
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                bcrypt
                    .compare(request.body.password, rows[0].contraseña)
                    .then((doMatch) => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.user = rows[0].nombre;
                            request.session.email = rows[0].email;
                            user.getPrivilegiosOne(rows[0].email)
                                .then(([consulta_privilegios, fieldData]) => {
                                    console.log(consulta_privilegios);
                                    const privilegios = [];
                                    for (let privilegio of consulta_privilegios) {
                                        privilegios.push(privilegio.nombrecu);
                                    }
                                    console.log(privilegios);
                                    request.session.privilegios = privilegios;

                                    return request.session.save((error) => {
                                        cliente.fetchOne(request.session.email)
                                            .then(([rows, fieldData]) => {
                                                if (rows.length === 0 && request.session.rol === "cliente") {
                                                    return response.redirect("/onyx/registrar-datos-iniciales");
                                                }
                                                else if (request.session.rol === "administrador") {
                                                    response.redirect("/admin/adminDashboard");
                                                }
                                                else {
                                                    response.redirect("/onyx/");
                                                }
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                if (error.code === "ER_DUP_ENTRY") {
                                                    request.session.mensaje = "El correo electrónico ya está registrado.";
                                                    response.redirect("/users/signup");
                                                } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                                                    request.session.mensaje = "Error Completar Registro.";
                                                    response.redirect("/users/signUp");
                                                } else {
                                                    response.render("dbDown", {
                                                        pagetitle: "Error",
                                                        user: request.session.user || "",
                                                    });
                                                }
                                            });
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                    if (error.code === "ER_DUP_ENTRY") {
                                        request.session.mensaje = "El correo electrónico ya está registrado.";
                                        response.redirect("/users/signup");
                                    } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                                        request.session.mensaje = "Error Completar Registro.";
                                        response.redirect("/users/signUp");
                                    } else {
                                        response.render("dbDown", {
                                            pagetitle: "Error",
                                            user: request.session.user || "",
                                        });
                                    }
                                });
                        } else {
                            request.session.mensaje =
                                "Usuario y/o contraseña incorrecta.";
                            if (request.session.rol === "administrador") {
                                response.redirect("/admin/adminDashboard");
                            } else if (request.session.rol === "cliente") {
                                response.redirect("/users/login");
                            }
                            console.log(rows);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.code === "ER_DUP_ENTRY") {
                            request.session.mensaje = "El correo electrónico ya está registrado.";
                            response.redirect("/users/signup");
                        } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                            request.session.mensaje = "Error Completar Registro.";
                            response.redirect("/users/signUp");
                        } else {
                            response.render("dbDown", {
                                pagetitle: "Error",
                                user: request.session.user || "",
                            });
                        }
                    });
            } else {
                request.session.mensaje = "Usuario y/o contraseña incorrecta.";
                response.redirect("/users/login");
            }
        })
        .catch((error) => {
            console.log(error);
            if (error.code === "ER_DUP_ENTRY") {
                request.session.mensaje = "El correo electrónico ya está registrado.";
                response.redirect("/users/signup");
            } else if (error.code === "PROTOCOL_CONNECTION_LOST") {
                request.session.mensaje = "Error Completar Registro.";
                response.redirect("/users/signUp");
            } else {
                response.render("dbDown", {
                    pagetitle: "Error",
                    user: request.session.user || "",
                });
            }
        });
};

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect("/users/login"); //Este código se ejecuta cuando la sesión se elimina.
    });
};