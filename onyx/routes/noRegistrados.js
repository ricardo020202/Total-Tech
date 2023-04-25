const express = require("express");
const router = express.Router();
const path = require("path");
const noRegController = require("../controllers/noRegistrados");
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '141860110384-4rkak3dc4oehtdj46ogd2aufa9vf34le.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/onyx';
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const mysql = require('mysql2');
const googleAuthController = require('../controllers/googleAuthController');
const passport = require('passport');


router.get("/", noRegController.getHome);

router.get("/TermYCond", noRegController.getTerms);

router.post('/auth/google/callback', googleAuthController.callbackPost);

module.exports = router;
