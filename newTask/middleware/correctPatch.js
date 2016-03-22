'use strict';
var validator = require('validator');
var User = require('../models/schema');

module.exports = function(req,res) {
    return new Promise((resolve,reject) => {
        User.findOne({
            email : req.body.email
        }, (err, user) =>{
            if (err) reject(err);
            if(!user) {
                res.end('We do not have such Email!!!!!!');
            } else if(user) {
                if( validator.isAlpha(req.body.first) == false ||
                    validator.isAlpha(req.body.last) == false ||
                    validator.isAlphanumeric(req.body.password) == false) {
                    res.end('To update you need fill : first,last,password! They must be a correct!')
                } else {
                    resolve()
                }
            }
        });
    })
}


