const user = require("../models/usuario");
const rolUsuario = require("../models/rol_usuario");

module.exports = (privilegio) => {
    return (request, response, next) => {
        user.getPrivilegiosOne(request.session.email)
            .then(([consulta_privilegios, fieldData]) => {
                rolUsuario.getStatusRol(request.session.email)
                    .then(([consulta_rol, fieldData]) => {
                        user.getRol(request.session.email)
                            .then(([rows, fieldData]) => {
                                request.session.rol = rows[0].nombreRol;
                            })
                            .catch((error) => {
                                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                                    response.render("dbDown", {
                                        pagetitle: "Error",
                                        user: request.session.user || "",
                                        rol: request.session.rol || "",
                                        photo: request.session.photo || 'default.png',
                                    });
                                } else {
                                    response.render("error", {
                                        pagetitle: "Error",
                                        user: request.session.user || "",
                                        rol: request.session.rol || "",
                                        photo: request.session.photo || 'default.png',
                                    });
                                }
                            });
                        const status = consulta_rol[0].statusRol;
                        const privilegios = [];
                        for (let privilegio of consulta_privilegios) {
                            privilegios.push(privilegio.nombrecu);
                        }
                        if (privilegios.includes(privilegio) && status === "on") {
                            next();
                        }
                        else {
                            response.status(404);
                            return response.render("404", {
                                pagetitle: "Error",
                                user: request.session.user || "",
                                rol: request.session.rol || "",
                                photo: request.session.photo || 'default.png',
                                rol: request.session.rol || '',
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.code === "PROTOCOL_CONNECTION_LOST") {
                            response.render("dbDown", {
                                pagetitle: "Error",
                                user: request.session.user || "",
                                rol: request.session.rol || "",
                                photo: request.session.photo || 'default.png',
                            });
                        } else {
                            response.render("error", {
                                pagetitle: "Error",
                                user: request.session.user || "",
                                rol: request.session.rol || "",
                                photo: request.session.photo || 'default.png',
                            });
                        }
                    });
            })
            .catch((error) => {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    response.render("dbDown", {
                        pagetitle: "Error",
                        user: request.session.user || "",
                        rol: request.session.rol || "",
                        photo: request.session.photo || 'default.png',
                    });
                } else {
                    response.render("error", {
                        pagetitle: "Error",
                        user: request.session.user || "",
                        rol: request.session.rol || "",
                        photo: request.session.photo || 'default.png',
                    });
                }
            });

    };
};