'use strict';

var fs = require('fs');
var _ = require('lodash');

var Converter = require("csvtojson").Converter;
var csvConverter = new Converter();


var promises = [];
var files = ['example1' , 'example2' ,'example3'];

_.forEach(files, function (item) {
    promises.push(  new Promise(function(resolve,reject){
        fs.createReadStream(`${item}.vs`)
            .on('error',function(){
                reject('Error when we try to read file');
            })
            .pipe(csvConverter)
            .pipe(fs.createWriteStream(`${item}.json`))
            .on('error',function(){
            reject('Error when we try to write file');
            })
            .on('finish',function(){
                resolve();
            })
        })
    )});

Promise.all(promises)
    .then(
        () => console.log('Ok')// if 3 times get Resolve
    )
    .catch(
        error => console.log(error) // if any time get reject
    );
