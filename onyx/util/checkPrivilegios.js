module.exports = (privilegio) => {
    return (request, response, next) => {
        if (request.session && request.session.privilegios && request.session.privilegios.includes(privilegio)) {
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
    };
};