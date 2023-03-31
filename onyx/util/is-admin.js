module.exports = (request, response, next) => {
    if (request.session.rol !== "administrador") {
        return response.redirect('/onyx');
    }
    next();
};