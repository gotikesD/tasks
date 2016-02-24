var http = require('http');
var server = new http.Server();

server.listen(3000);
var count = 0;
server.on('request', function(req,res) {
    res.end('Request is coming');
    console.log('Req coming' + count++);
});