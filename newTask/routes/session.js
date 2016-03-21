"use strict";

var express = require('express');
var router = express.Router();
var app = express();

var md5 = require('md5');
var jwt = require('jsonwebtoken');
var User = require('../models/schema');


var expressJWT = require('express-jwt');

app.use(expressJWT({secret : '123'}));




router.post('/login', function(req, res, next) {
   if(!req.body.email) {
       res.send('Need login')
   } else if(!req.body.password) {
       res.send('Need Password')
   } else {
       var pass = md5(req.body.password);
       User.findOne({ email : req.body.email , password : pass}, (err,doc) => {
           if(err) throw err;
           if(doc) {
               var token = jwt.sign({email : req.body.email}, '123')
               res.end(token)
           } else {
               res.end('We do not have such User!')
           }
       })
   }
});

router.post('/one',(req,res) => {
    
    User.find({},(err,doc) =>{
        if(err) throw err;
        res.json(doc);
    })
})



module.exports = router;