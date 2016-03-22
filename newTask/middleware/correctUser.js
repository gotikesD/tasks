'use strict';

module.exports = function(req,res) {
    let authorization = req.headers.authorization;
    if(!authorization) {
        return false
    } else return true
}