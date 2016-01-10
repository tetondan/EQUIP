var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server.js');
var db = require('../config_db.js');
var mongoose = require('mongoose');
var Item = require('../models/item.js');

// Adds support for assertions on array elements
// https://github.com/chaijs/Chai-Things#examples
chai.use(require('chai-things'));

var clearDB = function (done) {
  mongoose.connection.collections['item'].remove(done);
};

describe('RESTful API', function () {
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

        var testItems = [
          {

          },
          {

          },
          {

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
    return done();
  });

  describe('/api/items', function () {

    describe('GET', function () {

      it('responds with a 200 (OK) and all items', function (done) {

      });

    });

    describe('POST', function () {

      it('responds with a 201 (Created) when a valid item is sent', function (done) {

      });

    });
  });

  describe('/api/items/:id', function () {

    describe('PUT', function () {
      
      it('responds with a 200 and updated item when item with the matching `id` is updated', function (done) {
        
      });

    });

    describe('DELETE', function () {

      it('responds with a 200 and "removed" string when item with the matching `id` is deleted', function (done) {

      });

    });

  });

  describe('/api/items/checkin/:id', function () {

    describe('GET', function () {

      it('responds with a 200 (OK)', function (done) {

      });

    });

  }); 

  describe('/api/items/checkout/:id', function () {

    describe('GET', function () {

      it('responds with a 200 (OK)', function (done) {

      });

    });

  });

  describe('/api/items/getall/:busid', function () {

    describe('GET', function () {

      it('responds with a 200 (OK) and all the items with busid', function (done) {

      });

    });

  });   

});
