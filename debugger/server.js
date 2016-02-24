//To use Node-inspector we must run our NodeApp with flag --debug( node --debug some.js),
// after we must run node-inspector in the working directory(after start we will get 'inspector-adress')
var http = require('http');
var url = require('url');

var server =  new http.Server(function(req,res) {


    console.log(req.method , req.url);
    var parsed = url.parse(req.url , true);
    lalal();
    anotherlalal();
    if(parsed.pathname == '/echo' && parsed.query.message) {

        res.end(parsed.query.message);
    } else {
        res.statusCode = 404;
        res.end('Page not Found');
    }

});

server.listen(3000);