'use strict';

var express = require('express');
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


var memjs = require('memjs')
var client = memjs.Client.create();


var searchController = function (req, res) {
    var keyword = req.params.keyword;
    let keywordDB = new itemDataBase({
        keyword: keyword,
        updated: new Date()
    });
    keywordDB.save(function (err) {

        if (err) throw new Error(err.message);
    });


    var writingInMemory = function(data,arr,itemArr,count,whatDo) {
        var p = new MyConstr(data);
        arr.push(p);
        var itemData = new itemDataBase({
            product: {
                price: p.price,
                description: p.description,
                title: p.title,
                images: p.img,
                created: new Date(),
            }
        });
        itemData.save(function (err) {
            if (err) throw new Error(err.message);
            count++;
            if (count == itemArr.length) {
                whatDo(arr)
            }
        })
    };


    function MyConstr(file) {

        this.price = getPrice();
        this.title = getTitle();
        this.description = getDescription();
        this.img = getImg();

        function getTitle() {
            let title = file.match(regTitle);
            if (title) {
                title.forEach((item, index) => {
                    title[index] = item.slice(45, -7);
                })
            }
            return title;
        }

        function getDescription() {
            let description = file.match(regDesc);
            if (description) {
                description.forEach((item, index) => {
                    description[index] = item.slice(27, -7);
                });
            }

            return description;
        }

        function getImg() {
            let img = file.match(imgRegular);
            let sortedImages = _.sortedUniq(img);
            return sortedImages;
        }

        function getPrice() {

            let price = file.match(regPrice) || 0;
            if (price) {
                price.forEach((item, index) => {
                    price[index] = item.slice(68, -7);
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
            .then((array) => {
                return array
            })
            .then(writingToJson)
            .then(resEnd)
            .catch((error) => {
                console.log(error);
            });

        function getFile() {

            return new Promise((resolve, reject) => {

                var getTry = function () {

                    client.get(url + 'html1', function (err, val) {
                        if (val != null) {
                            resolve(val.toString());
                        } else {
                            request(
                                {
                                    method: 'GET',
                                    uri: url,
                                    headers: {
                                        'User-Agent': 'Chrome'
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
                                    fullUrl.save(function (err) {
                                        if (err) throw new Error(err.message);
                                    });


                                    client.set(url + 'html1', page, function (err, val) {
                                    }, 600);
                                    resolve(page);

                                })
                            }
                        });
                    }();
                });
            }

        function parsingDeals(page) {
            let findedItems = page.match(REGULAR);
            var arrOfItems = _.sortedUniq(findedItems);
            return arrOfItems;
        }

        function workWithFile(arrOfItems) {
            return new Promise((resolve, reject) => {
                var test = [];
                var counter = 0;
                arrOfItems.forEach((item, index) => {
                    client.get(item, function (err, res, val) {
                        if (!res) {
                            request({
                                    method: 'GET',
                                    uri: item,
                                    headers: {
                                        'User-Agent': 'Chrome'
                                    }
                                },
                                function (error, response, page) {
                                    client.set(item, page, function (err, val) {
                                        counter++;
                                        writingInMemory(page,test,arrOfItems,counter,resolve)
                                    }, 600);
                                })
                        } else {
                            counter++;
                            writingInMemory(res.toString(),test,arrOfItems,counter,resolve)
                        }
                    })
                });
            })

        }

        function writingToJson(test) {
            return new Promise((resolve, reject) => {
                fs.writeFile('./json/items.json', JSON.stringify(test, null, 2), function (err) {
                    if (err) throw new Error();
                    resolve()
                });

            })


        }

        function resEnd() {
            var file = fs.readFileSync('./json/items.json');
            res.end(file.toString())
        }
    }

};

module.exports = searchController;