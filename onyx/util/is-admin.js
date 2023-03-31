module.exports = (request, response, next) => {
    if (request.session.rol !== "administrador") {
        return response.render("404", {
            pagetitle: "Error",
            user: request.session.user || "",
            rol: request.session.rol || "",
        });
    }
    next();
};