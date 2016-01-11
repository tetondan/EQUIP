var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server.js');
var db = require('../config_db.js');
var mongoose = require('mongoose');
var Item = require('../models/item.js');
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

  describe('/api/items', function () {

    before(function (done) {

      clearDB(function () {
          
        mongoose.connection.collections['item'].remove();

        var newBusiness = {
          username: 'zz',
          password: 'zz',
          name: 'zz',
          address: 'co',
          phone: '7',
          website: 'www.zz.com',
          email: 'zz@zz.com'
        };

        var businessCopy = JSON.parse(JSON.stringify(newBusiness));
        Business.create(businessCopy, function (err, business) {
          if (err) {
            console.log(err, "Before Each");
            throw err;
          }

          var testItems = [
            {
              item: 'boots',
              price: 10,
              desc: 'ski',
              amt: 1,
              img: 'img1',
              businessId: business._id,
              dates: []
            },
            {
              item: 'football',
              price: 9,
              desc: 'sports',
              amt: 2,
              img: 'img2',
              businessId: business._id,
              dates: []
            }
          ];
          var itemCopy = JSON.parse(JSON.stringify(testItems));
          Item.create(itemCopy, function (err, items) {
            if (err) {
              console.log(err, "Before Each");
              throw err;
            }
          });
        });
      });
      return done();
    });


    describe('GET', function () {

      it('responds with a 200 (OK) and all items', function (done) {
        request(app)
          .get('/api/items')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, resp) {
            expect(resp.body.length).to.equal(2);
            done();
          });
      });

    });

    describe('POST AND GET', function () {

      it('responds with a 201 (Created) when a valid item is sent', function (done) {
        Business.find({username: 'zz'}, function(err, business) {
          if (err) {
            console.log(err);
            throw err;
          }

          var newItem = {
            item: 'helmets',
            price: 20,
            desc: 'ski',
            amt: 3,
            img: 'img3',
            businessId: business[0]._id,
            dates: []
          };

          var id = null;

          request(app)
            .post('/api/items')
            .send(newItem)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, resp) {
              id = resp.body.id;
              request(app)
                .get('/api/items/'+id)
                .set('Accept', 'application/json')
                .end(function (err, resp) {
                  expect(resp.body.item).to.equal('helmets');
                });
            });

          done(); 
        });
      });

    });
  });

  describe('/api/items/:id', function () {

    describe('PUT', function () {
      
      it('responds with a 200 and updated item when item with the matching `id` is updated', function (done) {
        Business.find({username: 'zz'}, function(err, business) {
          if (err) {
            console.log(err);
            throw err;
          }

          var newItem = {
            item: 'cups',
            price: 5,
            desc: 'drink',
            amt: 2,
            img: 'img4',
            businessId: business[0]._id,
            dates: []
          };

          var id = null;

          request(app)
            .post('/api/items')
            .send(newItem)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, resp) {
              id = resp.body.id;
              request(app)
                .put('/api/items/'+id)
                .send({amt: 4})
                .set('Accept', 'application/json')
                .end(function (err, resp) {
                  expect(resp.body.amt).to.equal(4);
                });
            });

          done();
        });
      });

    });

    describe('DELETE', function () {

      it('responds with a 200 and "removed" string when item with the matching `id` is deleted', function (done) {
        Business.find({username: 'zz'}, function(err, business) {
          if (err) {
            console.log(err);
            throw err;
          }

          var newItem = {
            item: 'earphones',
            price: 50,
            desc: 'music',
            amt: 6,
            img: 'img5',
            businessId: business[0]._id,
            dates: []
          };

          var id = null;

          request(app)
            .post('/api/items')
            .send(newItem)
            .set('Accept', 'application/json')
            .end(function (err, resp) {
              id = resp.body.id;
              request(app)
                .delete('/api/items/'+id)
                .end(function (err, resp) {
                  expect(resp.body.messages).to.equal('item removed');
                });
            });

          done();
        });
      });

    });

  });

  describe('/api/items/getall/:busid', function () {

    describe('GET', function () {
      it('responds with a 200 (OK) and all the items with busid', function (done) {
        Business.find({username: 'zz'}, function(err, business) {
          if (err) {
            console.log(err);
            throw err;
          }

          var newItem = {
            item: 'coats',
            price: 100,
            desc: 'ski',
            amt: 8,
            img: 'img6',
            businessId: business[0]._id,
            dates: []
          };

          request(app)
            .post('/api/items')
            .send(newItem)
            .set('Accept', 'application/json')
            .end(function (err, resp) {
              request(app)
                .get('/api/items/getall/'+business[0]._id)
                .end(function (err, resp) {
                  expect(resp.body.length).to.equal(5);
                });
            });

          done();
        });
      });

    });

  });  


});
