var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server.js');
var db = require('../config_db.js');
var mongoose = require('mongoose');
var Message = require('../models/message.js');

// Adds support for assertions on array elements
// https://github.com/chaijs/Chai-Things#examples
chai.use(require('chai-things'));

var clearDB = function (done) {
  mongoose.connection.collections['message'].remove(done);
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

        var testMessages = [
          {

          },
          {

          },
          {

          }
        ];
        var messageCopy = JSON.parse(JSON.stringify(testMessages));
        Message.create(messageCopy, function (err, messages) {
          if (err) {
            console.log(err, "Before Each");
            throw err;
          }
        });
    });
    return done();
  });

  describe('/api/messages', function () {

    describe('GET', function () {

      it('responds with a 200 (OK) and all messages', function (done) {

      });

    });

    describe('POST', function () {

      it('responds with a 201 (Created) when a valid message is sent', function (done) {

      });

    });

    describe('DELETE', function () {

      it('responds with a 200 and "deleted" string when messages are all deleted', function (done) {

      });

    });
  });

  describe('/api/messages/:busid', function () {

    describe('GET', function () {
      
      it('responds with a 200 and all messages with the matching busid', function (done) {
        
      });

    });


  });

  describe('/api/messages/:name', function () {

    describe('GET', function () {

      it('responds with a 200 (OK)', function (done) {

      });

    });

  }); 


});
