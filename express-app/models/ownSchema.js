var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/amazonTest');
var Schema = mongoose.Schema;

var itemDataBaseSchema = new Schema({
    url: String,
    updated : Date,
    keyword: String,
    product : {
        keyword : String,
        catalogUrl : String,
        price : Number,
        description : [String],
        title : String ,
        images : [String],
        created : Date
    }
});

var itemDataBase = mongoose.model('itemDataBase', itemDataBaseSchema);

module.exports = itemDataBase;