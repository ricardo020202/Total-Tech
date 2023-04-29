const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/users');

const csrf = require("csurf");
const csrfProtecion = csrf();

router.get('/login', csrfProtecion, userController.login);

router.post('/login', userController.post_login);

router.get('/signUp', userController.get_signup);

router.post('/signUp', userController.post_signup);

router.get('/logout', userController.logout);

module.exports = router;