const Onyx = require('../models/onyx');

exports.getHome = (req, res, next) => {
    res.render('home', { pagetitle: 'Onyx'});
};