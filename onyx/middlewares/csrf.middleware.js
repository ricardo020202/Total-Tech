const crsf = require('csurf');

// Middleware para proteger las rutas de la aplicación
module.exports = (options) => {
    const csrfProtection = crsf(options);

    return (req, res, next) => {
        csrfProtection(req, res, (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error interno' });
            }
            
            next();
        });
    };
}