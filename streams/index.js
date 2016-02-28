"use strict";
var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    if(req.url == '/big.html') {
        var file = new fs.ReadStream('big.html');
        sendFile(file,res);
    }
}).listen(2000);

function sendFile(file,res) {
   file.pipe(res);
   file.on('error', function(err){
       if(err) throw new Error;
   })
   res.on('close', function(){
       file.destroy();
   })
}