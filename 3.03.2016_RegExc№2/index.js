'use strict';

var http = require('http');
var fs = require('fs');
var request = require('request');

//var str = fs.readFileSync('./file.html', 'utf-8');

request('http://www.amazon.com/gp/goldbox').pipe(
    fs.createWriteStream('index.html')
);

