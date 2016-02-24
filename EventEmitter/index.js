var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter;

server.on('request' , function() {
   console.log("Request is coming");
});

server.emit('request', {from : 'Client 1'});
server.emit('request', {from : 'Client 1'});
server.emit('error' ,new Error('Some text error'));