"use strict";

var express = require('express');
var router = express.Router();
var md5 = require('md5');

var expressJWT = require('express-jwt');

var sessionController = require('../controllers/sessionController');
var tokenVerification = require('../middleware/tokenVerification');


router.use(expressJWT({secret : '123'}).unless({path : ['/session/login']}));

router.post('/login',sessionController.sessionPost );

router.get('/', tokenVerification, sessionController.sessionGet);

module.exports = router;