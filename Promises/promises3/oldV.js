'use strict';

var fs = require('fs');
var Q = require('q');
var promises = [];

function book(file) {
    promises.push(new Promise((resolve, reject) => {
        fs.readFile(file, (err, file) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(file))
        })
    })
        .then((data) => {
                data.forEach((item) => {
                    item.year = Math.floor(Math.random() * (2016 - 2000) + 2000);
                });
            return data;
            }))
}


function author(file) {
    promises.push(new Promise((resolve, reject) => {
        fs.readFile(file, (err, file) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(file))
        })
    })
        .then((data) => {
            data.forEach((item) => {
                item.year = Math.floor(Math.random() * (2000 - 1990) + 2000);
            });
            return data;

        }));
}

function descr(file) {
    promises.push(new Promise((resolve, reject) => {
        fs.readFile(file, (err, file) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(file))
        })
        }));
}


book('./book.json');
author('./author.json');
descr('./description.json');

Q.all(promises)
    .then(
        resolve => {
            var bookGet = resolve[0];
            var authorGet = resolve[1];
            var descrGet = resolve[2];
            descrGet.forEach(function(item){
                var current = authorGet[item.idA].firstname + ' ' +  authorGet[item.idA].lastname;
                bookGet[item.idb].author = current;
            });
            console.log(bookGet);
        }
    )
    .catch (
    (error) => console.log(error)
    )