var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");

describe("Testing search-controller",function(){

    var keyword = 'iphone';

    it("should try get search page",function(done){
        server
            .get("/api/search/"+ keyword)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.should.be.json;
                done();
            });
    });


});


describe("Testing product controller",function(){

    var title = '5S';
    var description = 'LED';

    it("Try get some data from my database",function(done){
        server
            .get("/product/search?title=5S&description=LED")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body = JSON.parse(res.text);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });


    it("Try get only 3 items on my page ",function(done){
        server
            .get("/product/search?title=5S&description=LED&perPage=3")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body = JSON.parse(res.text);
                console.log(res.body)
                res.body.should.be.instanceOf(Array).and.have.length(3);

                res.body[0].should.have.property('product');

                res.body[0].product.should.have.property('price');
                res.body[0].product.should.have.property('title');
                res.body[0].product.should.have.property('description');
                res.body[0].product.should.have.property('created');

                done();
            });
    });

    it("Try got non-existent(do not saved in DataBase) products ",function(done){
        server
            .get("/product/search?title=123123123123&description=123123123123&perPage=3")
            .expect(200)
            .end(function(err,res){
                res.text.should.equal('Sorry, we do not have products with such params!!')
                done();
            });
    });


});