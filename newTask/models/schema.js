var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/tokenUsers');
var Schema = mongoose.Schema;

var itemDataBaseSchema = new Schema({
    email : String,
    firstName : String,
    lastName : String,
    DOB : String,
    lastLogin : String,
    createdAt: Date,
    updatedAt: Date,
    status : {
        Active : Boolean,
        Wait : Boolean,
        Disabled : Boolean
    } ,
    password : String
});

var itemDataBase = mongoose.model('itemDataBase', itemDataBaseSchema);

module.exports = itemDataBase;