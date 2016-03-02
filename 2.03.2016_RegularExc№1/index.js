'use strict';

var fs = require('fs');
var regular = /<(.+)[^>]*>(.|\s)*<\/\1>/g;
var mas = [];

read('index.html');

function read(file) {
    fs.readFile(file, (err, data) => {
        if(err) throw new Error;
        var part = data.toString();
        var finded =  part.match(regular);
        finded.forEach(function (item) {
            var cont = item
                .replace(/^<([a-z0-9]+)>/g, "")
                .replace(/<\/[a-z0-9]+>$/g, "")
                .replace(/\n*/g,'');
            var nam =  item.match(/[a-z]+/)[0];
            var obj = {};
            obj.tag = nam;
            obj.content = cont;
            mas.push(obj);
        })
        console.log(mas);
    });
}


