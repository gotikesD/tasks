
var http = require('http');
var opt = require('optimist').argv;
http.createServer(function(req,res){
    res.end("Hello")

}).listen(opt.port);