var Animal = require('animal');
var db = require('db');
db.connect();

var cow = new Animal('Cow');
var bull = new Animal('Bull');

cow.sayHi(bull);
console.log(db.getText('Test'));

