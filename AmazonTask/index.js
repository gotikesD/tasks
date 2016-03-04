"use strict";
const fs = require('fs');
const http = require('http');
const request = require('request');
const _ = require('lodash');

const regPrice = /<span id="priceblock_dealprice" class="a-size-medium a-color-price">\$\d+\.\d{2}<\/span>/g;
const regTitle = /<span id="productTitle" class="a-size-large">.+<\/span>/g;
const regDesc = /<span class="a-list-item">[^<|\n]+<\/span>/g;

var arrItems = [];

for (let i = 1; i <= 10; i++) {
    processHTML('item' + i + '.html');
}

function processHTML(file) {

    readFile()
    //.then(parseHTML)
        .then(parsingDeals)
        .then(writingToJSON);




    function readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(body);
            });
        });
    }

    function parsingDeals(body) {
        let objItem = {};

        //http://ecx.images-amazon.com/images/I/61LAfVCnusL.jpg
        //    http://ecx.images-amazon.com/images/I/61SbBosThML._SX522_.jpg
        var IMAGE_ARRAY_REGULAR = /http:\/\/ecx\.images-amazon\.com\/images\/I\/[a-z|0-9]{11}\._[a-z|0-9]{6}_\.jpg/gi;
        let sortedImages = _.sortedUniq(body.match(IMAGE_ARRAY_REGULAR));
        objItem.images = sortedImages;
        var price = body.match(regPrice);
        price.forEach((item,  index) => {
            price[index] = item.slice(68,-7);
        });

        var title = body.match(regTitle);
        title.forEach((item,  index) => {
            title[index] = item.slice(45,-7);
        })

        var description = body.match(regDesc);
        description.forEach((item,  index) => {
            description[index] = item.slice(27,-7);
        })



        objItem.price = price;
        objItem.title = title;
        objItem.description = description;

        return objItem;
    }

    function writingToJSON(objItem) {
        arrItems.push(objItem);

        fs.writeFile('items.json', JSON.stringify(arrItems, null, 2), 'utf-8');
    }


}

