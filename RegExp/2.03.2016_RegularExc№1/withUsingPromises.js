"use strict";
const fs = require('fs');

function parseHTML(file) {

    function readHTML() {
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

    function doParseRec(text) {
        const regex =  /<([a-z0-9]+)(\s+[^>]*)?>(.|\s)*?<\/\1>/g;
        const openTag = /^<([a-z0-9]+)>/g;
        const closeTag = /<\/[a-z0-9]+>$/g;
        let allItems = [];
        let parsed = text.match(regex);

        if (!parsed) {
            return text;
        }

        parsed.forEach((item) => {

            let part = {};
            part.tag = item.match(/[a-z0-9]+/)[0];
            part.content = [];
            let child = item
                .replace(openTag, "")
                .replace(closeTag, "");
            part.content = doParseRec(child);
            allItems.push(part);
        });
        return allItems;
    }
    readHTML()
        .then(doParseRec)
        .then((value) => console.log(JSON.stringify(value, null, 2)))
        .catch(function(err) {
            throw new Error('Error');
        })
}

parseHTML('index.html');