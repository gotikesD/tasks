'use strict';

var fs = require('fs');

var str = fs.readFileSync('./index.html', 'utf-8');


const regex =  /<([a-z0-9]+)(\s+[^>]*)?>(.|\s)*?<\/\1>/g;
const openTag = /^<([a-z0-9]+)>/g;
const closeTag = /<\/[a-z0-9]+>$/g;

var result = doParseRec(str);
console.log(JSON.stringify(result, null, 2));

function doParseRec(text) {
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



