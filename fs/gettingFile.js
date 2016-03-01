/**
 * Created by user on 25.02.16.
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = __dirname + '/public';

http.createServer(function(req,res){
    if(!checking(req))
        res.statusCode = 403;
        res.end = "Premission Denied";
}).listen(3000);

function checking(req) {
    return url.parse(req.url,true).query.secret == '123';
}