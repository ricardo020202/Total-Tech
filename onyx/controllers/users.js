const user = require("../models/usuario");
const cliente = require("../models/cliente");
const bcrypt = require("bcryptjs");

exports.get_signup = (request, response, next) => {
    response.render("signUp", {
        pagetitle: "Sign up",
        isLoggedIn: request.session.isLoggedIn || false,
        user: request.session.user || "",
        csrfToken: request.csrfToken(),
        mensaje: request.session.mensaje || "",
    });
};

exports.post_signup = (request, response, next) => {
    const user_nuevo = new user({
        email: request.body.email,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        contraseña: request.body.password,
        telefono: request.body.telefono,
    });
    user_nuevo
        .save()
        .then(([rows, fieldData]) => {
            request.session.mensaje = "Usuario registrado.";

            // Loguear al usuario recién registrado
            user.fetch(request.body.email)
                .then(([rows, fieldData]) => {
                    if (rows.length > 0) {
                        bcrypt
                            .compare(request.body.password, rows[0].contraseña)
                            .then((doMatch) => {
                                if (doMatch) {
                                    request.session.isLoggedIn = true;
                                    request.session.user = rows[0].nombre;
                                    request.session.email = rows[0].email;
                                    user.getPrivilegios(rows[0].email)
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
                                        });
                                } else {
                                    request.session.mensaje = "Usuario y/o contraseña incorrecta.";
                                    response.redirect("/users/login");
                                    console.log(rows);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        request.session.mensaje = "Usuario no registrado.";
                        response.redirect("/users/login");
                    }
                })
                .catch((error) => console.log(error));
        })
        .catch((error) => {
            if (error.code === "ER_DUP_ENTRY") {
                request.session.mensaje = "El correo electrónico ya está registrado.";
                response.redirect("/users/signup");
            } else {
                response.render("/onyx/dbDown");
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
    });
};

exports.post_login = (request, response, next) => {
    user.fetch(request.body.email)
        .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                bcrypt
                    .compare(request.body.password, rows[0].contraseña)
                    .then((doMatch) => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.user = rows[0].nombre;
                            request.session.email = rows[0].email;
                            user.getPrivilegios(rows[0].email)
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
                                            if(rows.length === 0) {
                                                return response.redirect("/onyx/registrar-datos-iniciales");
                                            }
                                            else {
                                                response.redirect("/onyx/");
                                            }    
                                        })
                                        .catch((err) => console.log(err));
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        } else {
                            request.session.mensaje =
                                "Usuario y/o contraseña incorrecta.";
                            response.redirect("/users/login");
                            console.log(rows);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                request.session.mensaje = "Usuario no registrado.";
                response.redirect("/users/login");
            }
        })
        .catch((error) => console.log(error));
};

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect("/users/login"); //Este código se ejecuta cuando la sesión se elimina.
    });
};
