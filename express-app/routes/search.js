'use strict';

var express = require('express');
var router = express.Router();
var searchController = require('../controllers/search-controller');


router.get('/:keyword', searchController);



module.exports = router;