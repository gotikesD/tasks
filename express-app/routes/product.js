"use strict";

var express = require('express');
var router = express.Router();
var itemDataBase = require('../models/ownSchema');


router.get('/', function(req, res) {

    var keyTitle = req.query.title;
    var keyDescription = req.query.description;

    itemDataBase.find({},
                      {'product.images':0, 'product._id':0, '_id' :0 , '__v' : 0}, (err,data) => {
                        let returned = [];
                        data.forEach((item) => {

                            var title = item.product.title;
                            var description = item.product.description;
                            var formTitle = new RegExp(keyTitle);
                            var formDescr = new RegExp(keyDescription);

                            if(keyTitle) {
                                if (formTitle.test(title)) {
                                    let p = 'TITLE ' + item.product.title;
                                    returned.push(p);
                                }
                            }
                            if(keyDescription) {
                                if(formDescr.test(description)){
                                    let p = 'DESCRIPTION ' +  item.product.description;
                                    returned.push(p);
                                }
                            }


                        });
                            if(returned.length != 0){
                                res.end(JSON.stringify(returned,null,2));
                            } else { res.send('We do not have models with such models,sorry!')}

                      });

});

module.exports = router;


