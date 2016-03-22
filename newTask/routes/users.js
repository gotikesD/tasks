"use strict";

var express = require('express');
var router = express.Router();


var md5 = require('md5');

var usersController = require('../controllers/userController');


router.get('/', usersController.userGet);
router.post('/', usersController.userPost);
router.patch('/' , usersController.userPatch);

module.exports = router;
