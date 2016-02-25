//var http = require('http');
//var server = http.Server(function(req,res){
//    res.end('Lalal');
//}).listen(3000);
//
//setTimeout(function(){
//    server.close();
//},3000);
//
//var timer = setInterval(function(){
//    console.log(process.memoryUsage());
//},2000);
//var timer2 = setInterval(function(){
//    console.log('You can`t stop me');
//},2000);
//
//
//timer.unref();
//timer2.unref(); !!! - дает возможность остановить сервер, делая процесс второстпенным.


var fs = require('fs');

fs.readFile(__filename,function(err,file) {
    if(err) throw new Error;
    console.log('Hello');
});
setImmediate(function(){
   console.log('Hi, i am setImmediate');
});
process.nextTick(function(){
    console.log("I will be first");
});
process.nextTick(function(){
    console.log("I will be second");
})