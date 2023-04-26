const crypto = require('crypto');
const nodemailer = require('nodemailer');

const passwordReset = require('../models/password_resets');
const usuario = require("../models/usuario");

exports.getHome = (req, res, next) => {
    res.render("home", {
        pagetitle: "Onyx",
        user: req.session.user || "",
        rol: req.session.rol || "",
        photo: req.session.photo,
    });
};

// Crear terminos y condiciones

exports.getTerms = (req, res, next) => {
    res.render("TermYCond", {
        pagetitle: "Terminos Y Condiciones",
        user: req.session.user || "",
        rol: req.session.rol || "",
        photo: req.session.photo,
    });
};

// Crear reset password
exports.getForgotPassword = (req, res, next) => {
    res.render("olvidarPassword", {
        pagetitle: "Olvide mi Contraseña",
        user: req.session.user || "",
        rol: req.session.rol || "",
        photo: req.session.photo,
        csrfToken: req.csrfToken(),
    });
};

exports.postForgotPassword = async (req, res, next) => {
    const email = req.body.email;
    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const passwordRes = new passwordReset({
        email: email,
        token: token,
        expiration: expires,
    });

    passwordRes.save()
        .then(([rows, fieldData]) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com', // borren su correo antes de subir a github
                    pass: '' // borren su contraseña antes de subir a github
                }
            });

            const resetUrl = `http://localhost:3000/onyx/resetPassword/${token}`;

            const mailOptions = {
                from: 'your-email@gmail.com', // borren su correo antes de subir a github
                to: email,
                subject: 'Onyx - Restablecer Contraseña',
                html: `
                    <h1>Onyx</h1>
                    <p>Has solicitado restablecer tu contraseña</p>
                    <p>Da click en el siguiente enlace para restablecerla</p>
                    <a href="${resetUrl}">Restablecer Contraseña</a>
                `
            };

            res.redirect('/onyx');

            return transporter.sendMail(mailOptions);
        })
        .catch(err => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });
};

exports.getResetPassword = (req, res, next) => {
    res.render("resetPassword", {
        pagetitle: "Restablecer Contraseña",
        user: req.session.user || "",
        rol: req.session.rol || "",
        photo: req.session.photo,
        csrfToken: req.csrfToken(),
        token: req.params.token,
    });
};

exports.postResetPassword = (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;

    passwordReset.getEmail(token, new Date())
        .then(([rows, fieldData]) => {
            const email = rows[0].email;
            return usuario.changePassword(email, password)
                .then(([rows, fieldData]) => {
                    res.redirect('/onyx');
                })
                .catch(err => {
                    if (err.code === "PROTOCOL_CONNECTION_LOST") {
                        res.render("dbDown", {
                            pagetitle: "Error",
                            user: req.session.user || "",
                            photo: req.session.photo || 'default.png',
                            rol: req.session.rol || "",
                        });
                    } else {
                        console.log(err);
                    }
                });
        })
        .catch(err => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                res.render("dbDown", {
                    pagetitle: "Error",
                    user: req.session.user || "",
                    photo: req.session.photo || 'default.png',
                    rol: req.session.rol || "",
                });
            } else {
                console.log(err);
            }
        });
};
