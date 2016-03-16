"use strict";

var itemDataBase = require('../models/ownSchema');

var productController = function(req,res) {
    var keyTitle = req.query.title;
    var keyDescription = req.query.description;
    var perPage = req.query.perPage;
    var page = req.query.page;
    var priceFrom = req.query.from;
    var priceTo = req.query.to;

    if(keyTitle) {
        var formTitle = new RegExp(keyTitle);
    }
    if(keyDescription) {
        var formDescr = new RegExp(keyDescription);
    }
    var priceBegin = +priceFrom;
    var priceEnd = +priceTo;

    if(priceFrom == undefined) {
        priceBegin = 0;
    }
    if(priceTo == undefined) {
        priceEnd = 10000;
    }

    itemDataBase.find( {$and : [{'product.title' : formTitle},
                               {'product.description' : formDescr},
                               {'product.price' : {$gte : priceBegin , $lte : priceEnd} }
                              ]},
                       {'product._id' :0,'_id' :0 , '__v' : 0 , 'product.images':0},

                        function(edd,data){
                            if(data.length == 0) {
                                res.end('Sorry, we do not have products with such params!!');
                            }
                                res.end(JSON.stringify(data,null,2));
                        }).skip(+page * +perPage)
                          .limit(+perPage);

};

module.exports = productController;