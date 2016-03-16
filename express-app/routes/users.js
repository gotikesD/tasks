"use strict";

var express = require('express');
var router = express.Router();
var fs = require('fs');
var md5 = require('md5');
const request = require('request');

//var memjs = require('memjs');
//
//var mc = memjs.Client.create();
//
//var x = function(){
//    try {
//      var file =   fs.readFileSync('../test.txt');
//        console.log(file);
//        return file.toString();
//    } catch (e) {
//        console.log(e.message)
//    }
//
//};
//var y = [1,2];
//
//mc.set('something' , y.toString());
//
//mc.get('something', function (err, value) {
//  if (value != null) {
//      console.log(value);
//  }
//   else {
//    console.log('Bad')
//  }
//});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
