"use strict";

var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.get('/', productController);

module.exports = router;


