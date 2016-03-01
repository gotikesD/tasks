'use strict';

var fs = require('fs');


// Working with book.json

function book() {
    return new Promise((resolve, reject) => {

        readBook('book.json')
            .then(
                resolve => parseBook(resolve))
            .then(
                result => resolve(addField(result))
            )
            .catch(
                error => console.log(error)
            );

        function readBook(file) {
            return new Promise(function (resolve, reject) {
                fs.readFile(file, (err,file) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(file);
                })
            })
        }

        function parseBook(resolve) {
            try {
                var data = JSON.parse(resolve);
                return data;

            }
            catch (e) {
                if (e) throw new Error("Can`t parse JSON ");
            }
        }

        function addField(data) {
            return data.map((item) => {
                item.year = Math.floor(Math.random() * (2016 - 2000) + 2000);
                return item;
            })
        }
    });
}


// Working with author.json

function author() {
    return new Promise((resolve, reject) => {

        readAuthor('author.json')
            .then(
                resolve => parseAuthor(resolve)
            )
            .then(
                result => resolve(addField(result))
            )
            .catch(
                error => console.log(error)
            );

        function readAuthor(file) {
            return new Promise(function (resolve, reject) {
                fs.readFile(file, (err, file) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(file);
                })
            })
        }

        function parseAuthor(resolve) {
            try {
                var data = JSON.parse(resolve);
                return data;

            }
            catch (e) {
                if (err) throw new Error("Can`t parse JSON");
            }
        }

        function addField(data) {
            return data.map((item) => {
                item.year = Math.floor(Math.random() * (2000 - 1990) + 1990);
                return item;
            })
        }
    });
}

// Working with description.json

function description() {
    return new Promise((resolve, reject) => {

        readDescr('description.json')
            .then(
                resolve => parseDescr(resolve)
            )
            .then(
                result => resolve(result)
            )
            .catch(
                error => console.log(error)
            );

        function readDescr(file) {
            return new Promise(function (resolve, reject) {
                fs.readFile(file, (err, file) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(file);
                })
            })
        }

        function parseDescr(resolve) {
            try {
                var data = JSON.parse(resolve);
                return data;

            }
            catch (e) {
                if (err) throw new Error("Can`t parse JSON");
            }
        }

    });
}

// Init my Promises
var promises = [book(), author(), description()];


Promise.all(promises)
    .then(
        resolve => {
            var bookGet = resolve[0];
            var authorGet = resolve[1];
            var descrGet = resolve[2];

            bookGet.forEach((book)=> {

                var temp = descrGet.filter((bookAuthor)=> {
                    return book.id == bookAuthor.idb;
                });

                if (temp.length == 0) {
                    return;
                }

                var author = [];
                for (var i = 0; i < temp.length; i++) {
                    for (var j = 0; j < authorGet.length; j++) {
                        if (temp[i]['idA'] == authorGet[j]['id']) {
                            author.push(authorGet[j].firstname + ' ' + authorGet[j].lastname);
                        }
                    }
                }
                book['authors'] = author;

            });
            console.log(JSON.stringify(bookGet, null, 2));
        }
    )
    .catch(
        (error) => console.log(error)
    );


