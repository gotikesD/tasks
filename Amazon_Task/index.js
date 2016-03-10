"use strict";
const fs = require('fs');
const http = require('http');
const request = require('request');
const _ = require('lodash');
const md5 = require('md5');
const path = require('path');

const amazonUrl = 'http://www.amazon.com/s?field-keywords=iphone';
const REGULAR = /http:\/\/www\.amazon\.com\/(\w|\d|-)*\/dp\/[a-z|0-9]{10}/gi
const regPrice = /<span (id="priceblock_(ourprice|saleprice)*")* class="a-size-medium a-color-price">\$\d+\.\d{2}<\/span>/g;
const regTitle = /<span id="productTitle" class="a-size-large">.+<\/span>/g;
const regDesc = /<span class="a-list-item">[^<]*<\/span>/g;
const imgRegular = /http:\/\/ecx\.images-amazon\.com\/images\/I\/[a-z|0-9]{11}\.*\.jpg/gi;

const testPrice = /<span class="a-color-price">\$\d+\.+\d{2}<\/span>/g;

function MyConstr(url) {
    let self = this;
    this.url = url;

    self.file = function (){
        var files = fs.readFileSync('cached_'+md5(url) + '.html');
        return files.toString();
    };

    self.getTitle = function() {
        let title = self.file().match(regTitle);
        title.forEach((item,  index) => {
            title[index] = item.slice(45,-7);
        })
        return title;
    };

    self.getDescription = function() {
        let description = self.file().match(regDesc);
        description.forEach((item,  index) => {
            description[index] = item.slice(27,-7);
        });
        return description;
    };

    self.getImg = function() {
        let img = self.file().match(imgRegular);
        let sortedImages = _.sortedUniq(img);
        return sortedImages;
    };

    self.getPrice = function(){
        let price = self.file().match(regPrice);
        if(price) {
            price.forEach((item, index) => {
                price[index] = item.slice(68,-7);
            });
        }  else  {
            price = 'See offer at ' + url;
        }
        return price;
    };


    self.returningObject = function () {
        let createdObj = {};
        createdObj.price = self.getPrice();
        createdObj.title = self.getTitle();
        createdObj.description = self.getDescription();
        createdObj.img = self.getImg();
        return createdObj;
    }();
}



processHTML(amazonUrl);

function processHTML(url) {

    getFile()
        .then(parsingDeals)
        .then(workWithFile)
        .then(writingToJson)
        .catch((error) => {
            console.log(error);
        })

    function getFile() {
        return new Promise((resolve, reject) => {
            request(
                {
                    method: 'GET',
                    uri: url,
                    headers: {
                        'User-Agent': 'Chromium'
                    }
                },
                function (error, response, page) {
                    if (error) {
                        reject(new Error('Page not found'));
                        return;
                    }
                    resolve(page);

                })
        })

    }

    function parsingDeals(page) {
        let findedItems = page.match(REGULAR);

        var arrOfItems = _.sortedUniq(findedItems);
        arrOfItems.forEach((item) => {
            var file = 'cached_' + md5(item) + '.html';
            fs.open(file, "r+", function (err) {
                if (err) {
                    request({
                        method: 'GET',
                        uri: item,
                        headers: {
                            'User-Agent': 'Chromium'
                        }
                    }).pipe(
                        fs.createWriteStream('cached_' + md5(item) + '.html')
                    )
                } else {
                    return;
                }

            });
        })
            return arrOfItems;
        }

            function workWithFile(arrOfItems) {
                var test = [];
                arrOfItems.forEach((item) => {
                    var p = new MyConstr(item);
                    test.push(p.returningObject);
                })
                return test;
                }

            function writingToJson(test){
                fs.writeFile('./json/items.json', JSON.stringify(test, null ,2 ));
            }
        }

