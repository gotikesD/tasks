
 // Util inspect
var util = require('util');
var some = {
    a : 1,
    b : 2 ,
};
console.log(util.inspect(some));

 // Util fromat

var str = util.format("My %d %d %d" , 123, 'string' , {test : "obj"});
console.log(str);

 // Util inherits

function Man(name) {
    this.name = name;
}

Man.prototype.walk = function() {
    console.log('Walk ' + this.name);
}

function Child(name) {
    this.name = name;
}

util.inherits(Child,Man);

var child = new Child('Child');
child.walk();