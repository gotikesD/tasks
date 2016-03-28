"use strict";

var express = require('express');
var router = express.Router();
var md5 = require('md5');

var expressJWT = require('express-jwt');

var sessionController = require('../controllers/sessionController');
var tokenVerification = require('../middleware/tokenVerification');

var passportLocalMW = require('../middleware/passportLocalMW');
var passportFacebook = require('../middleware/passportFacebook');
var passportGoogle = require('../middleware/passportGoogle');
var passportTwitter = require('../middleware/passportTwitter');


var passport = require('passport');

//router.use(expressJWT({secret : '123'}).unless({path : [
//    '/session/login' ,
//    '/session/profile' ,
//    '/session/facebook' ,
//    '/session/facebook/callback',
//    '/session/facebook/success',
//    '/session/facebook/error',
//    '/session/google',
//    '/session/google/callback',
//    '/session/google/success',
//    '/session/google/error'
//]}));

router.post('/login',sessionController.sessionPost );

router.get('/', tokenVerification, sessionController.sessionGet);

router.post('/profile', passportLocalMW );



//FACEBOOK

router.get('/facebook',passportFacebook.firstStep);
router.get('/facebook/callback',passportFacebook.secondStep);

router.get('/facebook/success', function(req, res, next) {
    res.send('You login as ' + req.user.displayName);
});
router.get('/facebook/error', function(req, res, next) {
    res.send('Error when logged in FACEBOOK');
});


   //GOOGLE
router.get('/google',passportGoogle.firstStep);
router.get('/google/callback',passportGoogle.secondStep);

router.get('/google/success', function(req, res, next) {
    res.send('You login as ' + req.user.email);
});

router.get('/google/error', function(req, res, next) {
    res.send('Error when logged in GOOGLE');
});


// TWITTER

router.get('/twitter',passportTwitter.firstStep);
router.get('/twitter/callback',passportTwitter.secondStep);

router.get('/twitter/success', function(req, res, next) {
    res.end('You Log in Twitter');
});

router.get('/twitter/error', function(req, res, next) {
    res.send('Error when logged in Twitter');
});



module.exports = router;