var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server.js');
var db = require('../config_db.js');
var mongoose = require('mongoose');
var Business = require('../models/business.js');

// Adds support for assertions on array elements
// https://github.com/chaijs/Chai-Things#examples
chai.use(require('chai-things'));

var clearDB = function (done) {
  mongoose.connection.collections['business'].remove(done);
};

describe('RESTful API------------------------', function () {
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect('mongodb://localhost/fearlessgerbil', done);
  });
  beforeEach(function (done) {
    // Send a deep copy in so internal mutations do not affect our `testUsers` array above
    // Note: This copy technique works because we don't have any functions

    clearDB(function () {

        var testBusinesses = [
          {
            username: 'Taka',
            password: 'tt',
            name: 'ta',
            address: 'sf',
            phone: '1',
            website: 'www.taka.com',
            email: 'taka@taka.com'
          },
          {
            username: 'Zack',
            password: 'zz',
            name: 'za',
            address: 'ny',
            phone: '2',
            website: 'www.zack.com',
            email: 'zack@zack.com'
          },
          {
            username: 'Dan',
            password: 'dd',
            name: 'da',
            address: 'pa',
            phone: '3',
            website: 'www.dan.com',
            email: 'dan@dan.com'
          }
        ];
        var businessCopy = JSON.parse(JSON.stringify(testBusinesses));
        Business.create(businessCopy, function (err, businesses) {
          if (err) {
            console.log(err, "Before Each");
            throw err;
          }
        });
    });
    return done();
  });

  describe('/api/businesses', function () {

    describe('GET', function () {

      it('responds with a 200 (OK) and all businesses', function (done) {
        request(app)
          .get('/api/businesses')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, resp) {
            var length = 0;
            for (var key in resp.body) {
              length++;  
            }
            expect(length).to.equal(3);
            done();
          });

      });

    });

  });

  describe('/api/businesses/signup', function () {
    describe('POST AND GET', function () {

      var newBusiness = {
        username: 'nn',
        password: 'nn',
        name: 'nn',
        address: 'co',
        phone: '4',
        website: 'www.nn.com',
        email: 'nn@nn.com'
      };

      it('responds with a 201 (Created) when a valid business is sent', function (done) {
        var id = null;
        request(app)
          .post('/api/businesses/signup')
          .send(newBusiness)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function (err, resp) {
            id = resp.body._id;
            request(app)
              .get('/api/businesses/'+id)
              .set('Accept', 'application/json')
              .end(function (err, resp) {
                expect(resp.body.email).to.equal('nn@nn.com');
              });
            done();
          });

      });

    });

  });


  describe('/api/businesses/:id', function () {

    describe('PUT', function () {
      
      it('responds with a 200 (OK) when a business with the matching `id` is updated', function (done) {
        var newBusiness = {
          username: 'jj',
          password: 'jj',
          name: 'jj',
          address: 'hb',
          phone: '5',
          website: 'www.jj.com',
          email: 'jj@jj.com'
        };
        
        var id = null;

        request(app)
          .post('/api/businesses/signup')
          .send(newBusiness)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function (err, resp) {
            id = resp.body._id;
            request(app)
              .put('/api/businesses/'+id)
              .send({ name: 'John_update' })
              .set('Accept', 'application/json')
              .end(function (err, resp) {
                expect(resp.body.name).to.equal('John_update');
              });
            done();
          });

      });

    });

    describe('DELETE', function () {

      it('responds with a 200 (OK) when a business with the matching `id` is deleted', function (done) {
        var newBusiness = {
          username: 'll',
          password: 'll',
          name: 'll',
          address: 'bj',
          phone: '6',
          website: 'www.ll.com',
          email: 'll@ll.com'
        };
        
        var id = null;

        request(app)
          .post('/api/businesses/signup')
          .send(newBusiness)
          .set('Accept', 'application/json')
          .end(function (err, resp) {
            id = resp.body._id;
            request(app)
              .delete('/api/businesses/'+id)
              .end(function (err, resp) {
                expect(resp.body.messages).to.equal('business removed');
              });
            done();
          });
      });


    });

  });

});
