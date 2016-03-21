'use strict';
var fs = require('fs');

var regExc1 = /<body(\s.+)?>(.+|\n|\s)*<\/body>/gi;
var regExc2 = /<h1(\s.+?)?>.+<\/h1>/gi;

var body = fs.readFile('index.html',function(err,data){
    if(err) throw err;
    let item = data.toString();
    let body = ""+item.match(regExc1);
    let h1 = ""+item.match(regExc2);
    let h1Inside = h1.replace(/<\/*h1(\s.+?)?>/g, '');

    console.log(body);
    console.log("Content of H1 --" + h1Inside);
});
