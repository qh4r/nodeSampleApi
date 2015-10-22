/**
 * Created by qh4r on 22.10.15.
 */

var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);


describe('Book Crud test', function(){
    it('Should allow book to be posted and then return read and _id', function(done){
        var bookMock = {title: 'Krew i Piach', author: 'Rafał', genre: 'Fantasy'};

        agent.post('/api/books')
            .send(bookMock)
            .expect(200)
            .end(function(req, res){
                res.body.read.should.equal(false);
                res.body.should.have.property('_id');

                done();
            })

    })

    afterEach(function(done){
        Book.remove().exec();
        done();
    })
});