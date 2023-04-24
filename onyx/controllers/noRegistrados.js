exports.getHome = (req, res, next) => {
    res.render("home", {
        pagetitle: "Onyx",
        user: req.session.user || "",
        rol: req.session.rol || "",
        photo : req.session.photo,
    });
};

// Crear terminos y condiciones

exports.getTerms= (req, res, next) => {
    res.render("TermYCond", {
        pagetitle: "Terminos Y Condiciones",
        user: req.session.user || "",
        rol: req.session.rol || "",
        photo : req.session.photo,
    });
};