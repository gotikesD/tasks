'use strict';

var fs = require('fs');
var _ = require('lodash');
var Q = require('q');
var Converter = require("csvtojson").Converter;
var csvConverter = new Converter();


var promises = [];
var files = ['example1' , 'example2' ,'example3'];

_.forEach(files, function (item) {
    promises.push(  new Promise(function(resolve,reject){
        var write = fs.createWriteStream(`${item}.json`)
        fs.createReadStream(`${item}.csv`)
            .on('error',function(err){
                reject(err);
            })
            .pipe(csvConverter)
            .pipe(write).on('error',function(err){
               reject(err);

            })
            .on('finish',function(){
                resolve('I am a ' + `${item}.json` +' All is ok');
            })
        })
    )});

Q.allSettled(promises)
    .then(
        mes => console.log(mes)
    )
    .catch(
        error => console.log(error)
    )