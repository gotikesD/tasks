"use strict";

var express = require('express');
var router = express.Router();
var User = require('../models/schema');

var md5 = require('md5');

var usersPatch = require('../controllers/usersPatch')

router.get('/', function(req, res, next) {
    User.find({}, (err,users) => {
      res.json(users)
    })
  });


router.post('/', (req,res) => {

  var user = new User({
    firstName: req.body.first,
    lastName: req.body.last,
    email : req.body.email,
    DOB : req.body.dob,
    password : md5(req.body.password),
    createdAt: new Date()
  });
  user.save((err) => {
    if(err) throw  err;
  });
  res.json(user)

});


router.patch('/' , usersPatch);

module.exports = router;
