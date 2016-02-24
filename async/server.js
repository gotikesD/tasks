var http = require('http');
var fs = require('fs');

http.createServer(function(req,res) {
    var page;
    if(req.url == '/') {

        //page = fs.readFileSync('index.html');
        //res.write(page);                   - sync method. If index.html will be too big,
        // next request from another client will be in a turn;

        //fs.readFile('index.html' , function (err, page) {
        //    if(err) throw new Error;
        //    res.end(page);                 - async method.
        //})
    }
}).listen(3000);