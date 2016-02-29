'use strict';

var fs = require('fs');
var Q = require('q');

var promises = [];
var files = ['book', 'author', 'itemDescr'];

function {
    return new Promise(function (resolve, reject) {
        try {
            let obj = {
                book: require('./book.json'),
                author: require('./author.json'),
                itemDescr: require('./description.json')
            }
            resolve(obj);
        }
        catch (e) {
            reject(e);
        }
    })
}


Q.all(promises)
    .then(
        resolve => {
            let book = resolve.book;
            book.forEach(function (item) {
                item.year = Math.floor(Math.random() * (2016 - 2000) + 2000);
            });
            return resolve;
        })
    .then(
        resolve => {
            let author = resolve.author;
            author.forEach(function (item) {
                item.dateofBirth = Math.floor(Math.random() * (2000 - 1990) + 1990);
            });
            return resolve;
        }
    )
    .then(
        resolve => {
            let book = resolve.book;
            let author = resolve.author;
            let itemDescr = resolve.itemDescr;
            var result = [];
            Object.assign(result, resolve.book); // Copying Object

            result.forEach(function (item) {
                item.new = book.id;
            });
            console.log(result);


        }
    )
    .catch(
        error => console.log(error)
    )


//.then(
//    function bookRead() {
//        obj.book.forEach(function(item){
//
//        })
//    }
//)
//.then(
//    function authorRead() {
//        obj.author.forEach(function(item){
//
//        })
//    }
//)
//.catch (
//error => console.log(error)
//)
