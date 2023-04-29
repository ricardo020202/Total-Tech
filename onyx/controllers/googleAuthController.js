/*googleAuthController.js*/
/*
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '141860110384-4rkak3dc4oehtdj46ogd2aufa9vf34le.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const csrf = require("csurf");
const db = require("../util/database");

const googleAuthController = {};

googleAuthController.callbackPost = async (req, res) => {

    // Obtén el código de autorización de la URL
    const code = req.query.code;

    if (!code) {
        res.status(400).send('No se proporcionó el código de autorización.');
        return;
    }

    try {
        // Intercambia el código de autorización por tokens de acceso y de ID
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        //req.session.token = tokens;
        req.query.token = tokens;
        req.session.save();

        // Usa el token de ID para verificar la autenticación y obtener la información del usuario
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userId = payload.sub;
        const userEmail = payload.email;
        const audience = payload.aud;
        if (audience !== CLIENT_ID) {
            res.status(401).send('El token de ID no es válido.');
            return;
        }

        res.cookie('googleAuth', tokens.id_token, { maxAge: 3600000, httpOnly: true });
        res.redirect('/');

        // Aquí puedes manejar la autenticación de tu aplicación y vincular el usuario de Google con tu aplicación
        // Por ejemplo, puedes crear o actualizar el usuario en tu base de datos utilizando 'userId' y 'userEmail'

    } catch (error) {
        console.error('Error al intercambiar el código de autorización por tokens:', error);
        res.status(500).send('Error en el proceso de autenticación.');
    }
};

module.exports = googleAuthController;

*/