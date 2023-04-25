const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

// Crear reset password
exports.getForgotPassword = (req, res, next) => {
    res.render("olvidarPassword", {
        pagetitle: "Olvide mi Contraseña",
        user: req.session.user || "",
        rol: req.session.rol || "",
        photo : req.session.photo,
        csrfToken: req.csrfToken(),
    });
};

exports.postForgotPassword = (req, res, next) => {

};

exports.getResetPassword = (req, res, next) => {
};

exports.postResetPassword = (req, res, next) => {
};