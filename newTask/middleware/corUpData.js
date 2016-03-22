'use strict';
var validator = require('validator');


module.exports = function(req,res) {
    if(validator.isAlpha(req.body.first) == false ||
       validator.isAlpha(req.body.last) == false
    ) {
        res.end('Name Must Contain only letters or you do not fill field!')
    } else if(validator.isEmail(req.body.email) == false){
        res.end('It is not a email or you do not fill field!')
    } else if(validator.isNumeric(req.body.dob) == false || req.body.dob.length < 8){
        res.end('It is not your Date of Birthday! or you do not fill field!')
    } else if(validator.isAlphanumeric(req.body.password) == false){
        res.end('Wow! Its look like bad! Did you fill  password field?')
    }
    else if(
        req.body.createdAt ||
        req.body.updatedAt ||
        req.body.lastLogin
    ) {
        res.status(403).send('Permission denied! You cant change this fields')
    } else {
        return true
    }
}


