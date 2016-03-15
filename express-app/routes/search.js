'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var itemDataBase = require('../models/ownSchema');
const request = require('request');
const _ = require('lodash');
const md5 = require('md5');
const path = require('path');




const amazonUrl = 'http://www.amazon.com/s?field-keywords=';
const REGULAR = /http:\/\/www\.amazon\.com\/(\w|\d|-)*\/dp\/[a-z|0-9]{10}/gi
const regPrice = /<span (id="priceblock_ourprice" )*class="a-size-medium a-color-price">\$\d+\.\d{2}<\/span>/g;
const regTitle = /<span id="productTitle" class="a-size-large">.+<\/span>/g;
const regDesc = /<span class="a-list-item">[^<]*<\/span>/g;
const imgRegular = /http:\/\/ecx\.images-amazon\.com\/images\/I\/[a-z|0-9]{11}\.*\.jpg/gi;


router.get('/:keyword', function(req, res, next) {

    var keyword = req.params.keyword;
    let keywordDB = new itemDataBase({
        keyword: keyword,
        updated : new Date()
    });
    keywordDB.save(function(err) {

        if(err) throw new Error(err.message);
    });

    function MyConstr(url) {

        this.price = getPrice();
        this.title = getTitle();
        this.description = getDescription();
        this.img = getImg();



        function selfFile(){
            var files = fs.readFileSync('./cache/cached_'+md5(url) + '.html');
            return files.toString();
        };

        function getTitle() {
            var file = selfFile();
            let title = file.match(regTitle);
            if(title) {
                title.forEach((item,  index) => {
                    title[index] = item.slice(45,-7);
                })
            }
            return title;
        };

        function getDescription() {
            var file = selfFile();
            let description = file.match(regDesc);
            if(description) {
                description.forEach((item,  index) => {
                    description[index] = item.slice(27,-7);
                });
            }

            return description;
        };

        function getImg() {
            var file = selfFile();
            let img = file.match(imgRegular);
            let sortedImages = _.sortedUniq(img);
            return sortedImages;
        };

        function getPrice(){
            var file = selfFile();
            let price = file.match(regPrice) || 0;
            if(price) {
                price.forEach((item, index) => {
                    price[index] = item.slice(68,-7);
                });
            }
            return Number(price).toFixed(2);
        }

    }



    processHTML(amazonUrl + keyword);

    function processHTML(url) {

        getFile()
            .then(parsingDeals)
            .then(workWithFile)
            .then(writingToJson)
            .then(resEnd)
            .catch((error) => {
                console.log(error);
            });

        function getFile() {
            return new Promise((resolve, reject) => {
                request(
                    {
                        method: 'GET',
                        uri: url,
                        headers: {
                            'User-Agent': 'Chrone'
                        }
                    },
                    function (error, response, page) {
                        if (error) {
                            reject(new Error('Page not found'));
                            return;
                        }

                        let fullUrl = new itemDataBase({
                            url: url
                        });
                        fullUrl.save(function(err) {
                            if(err) throw new Error(err.message);
                        });
                        console.log(url)
                        resolve(page);

                    })
            })

        }

        function parsingDeals(page) {
            let findedItems = page.match(REGULAR);

            var arrOfItems = _.sortedUniq(findedItems);
            arrOfItems.forEach((item) => {
                var file = './cache/cached_' + md5(item) + '.html';
                fs.open(file, "r+", function (err) {
                    if (err) {
                        request({
                            method: 'GET',
                            uri: item,
                            headers: {
                                'User-Agent': 'Chrome'
                            }

                        }).pipe(
                            fs.createWriteStream('./cache/cached_' + md5(item) + '.html')
                        )
                    } else {
                        return;
                    }

                });
            });
            return arrOfItems;
        }

        function workWithFile(arrOfItems) {
            var test = [];
            arrOfItems.forEach((item) => {
                try {
                    var p = new MyConstr(item);
                    test.push(p);
                    item = new itemDataBase({
                        product : {
                            price: p.price,
                            description: p.description,
                            title: p.title ,
                            images : p.img,
                            created: new Date(),
                        }
                    });
                }
                catch(e) {console.log(e.message)}
                item.save(function(err){
                    if(err) throw new Error(err.message)
                })
            });
            return test;
        }

        function writingToJson(test){
            return new Promise( (resolve,reject) => {
               fs.writeFile('./json/items.json', JSON.stringify(test, null ,2 ) , function(err) {
                    if(err) throw new Error();
                    resolve()
                });

            })


        }

        function resEnd() {
            var file = fs.readFileSync('./json/items.json');
            res.end(file.toString());
        }
    }

});



module.exports = router;