var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/tokenUsers');
var Schema = mongoose.Schema;

var itemDataBaseSchema = new Schema({
    email : { type : String , unique : true , dropDups: true},
    firstName : String,
    lastName : String,
    DOB : Date,
    lastLogin : String,
    createdAt: Date,
    updatedAt: Date,
    status : {
        Active : Boolean,
        Wait : Boolean,
        Disabled : Boolean
    } ,
    address : {
        country : String,
        city : String,
        zip : Number
    },
    notes : {
        note1: Schema.Types.Mixed,
        note2: Schema.Types.Mixed
    } ,
    password : String
});

var itemDataBase = mongoose.model('itemDataBase', itemDataBaseSchema);

module.exports = itemDataBase;