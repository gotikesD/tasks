var http = require('http');
var url = require('url');

var server =  new http.Server(function(req,res) {

     //Parsing req.url, getting pathname,query.message

    //console.log(req.method , req.url);
    //var parsed = url.parse(req.url , true)
    //console.log(parsed);
    //if(parsed.pathname == '/echo' && parsed.query.message) {
    //    res.setHeader('Cache-control' , 'no-cache'); - первый способ передачи заголовка
    //    //res.writeHead(500,'Some Server Error', {}); - второй способ передачи заголовка
    //    res.end(parsed.query.message);
    //} else {
    //    res.statusCode = 404;
    //    res.end('Page not Found');
    //}

});

server.listen(3000);