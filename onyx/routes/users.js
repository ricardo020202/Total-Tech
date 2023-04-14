const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/login', userController.login);

router.post('/login', userController.post_login);

router.get('/signUp', userController.get_signup);

router.post('/signUp', userController.post_signup);

router.get('/logout', userController.logout);

module.exports = router;