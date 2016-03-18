"use strict";

var product = require('../routes/product.js');

var should = require('should');
var supertest = require('supertest');
var server = supertest.agent('http://localhost:3000');
var users = require('../routes/users');


    describe('Some test' , function(){

        it('Try get Home page' , function(done){
            server
                .get('/')
                .expect(200)
                .end(function(err,res){
                    res.status.should.equal(200);
                    done();
                });
        });

        it('Try get unresolved page', function (done) {
            server
                .get('/cofee')
                .expect(404)
                .end(function(err,res) {
                    res.status.should.equal(404);
                    done()
                })

        })

        it('Read responce test ', function (done) {
            supertest(users)
                .get('/')
                .expect(/Hello world/,done)
        })
    });