"use strict";

var express = require('express');
var router = express.Router();
var fs = require('fs');
var md5 = require('md5');
const request = require('request');

router.get('/', function(req, res, next) {
  res.send('Hello world');
});

module.exports = router;
