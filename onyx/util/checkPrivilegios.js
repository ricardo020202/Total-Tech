const user = require("../models/usuario");

module.exports = (privilegio) => {
    return (request, response, next) => {
        user.getPrivilegiosOne(request.session.email)
            .then(([consulta_privilegios, fieldData]) => {
                const privilegios = [];
                for (let privilegio of consulta_privilegios) {
                    privilegios.push(privilegio.nombrecu);
                }
                if (privilegios.includes(privilegio)) {
                    next();
                }
                else {
                    return response.render("404", {
                        pagetitle: "Error",
                        user: request.session.user || "",
                        rol: request.session.rol || "",
                        photo: request.session.photo || 'default.png',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
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
};