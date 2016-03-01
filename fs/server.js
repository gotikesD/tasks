var fs = require('fs');

//fs.writeFile('some.txt', 'Test file');
//fs.rename('some.txt', 'created.txt');
//fs.readFile(__filename,function(err,data){
//    if(err) throw new Error;
//    if(data.toString())
//        fs.writeFile('Some.txt', 'I am born');
//    console.log(data.toString());
//});

fs.stat(__filename,function(err,stats){

    console.log(stats.isDirectory());
    console.log(stats.isFile());
});

fs.unlink('Some.txt', function (err) {
    if(err) throw new Error;
})