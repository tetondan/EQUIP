var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server.js');
var db = require('../config_db.js');
var mongoose = require('mongoose');
var Item = require('../models/item.js');
var Business = require('../models/business.js');
var Message = require('../models/message.js');

// Adds support for assertions on array elements
// https://github.com/chaijs/Chai-Things#examples
chai.use(require('chai-things'));

var clearDB = function (done) {
  //mongoose.connection.collections['message'].remove(done);
  mongoose.connection.collections['item'].remove(done);
  mongoose.connection.collections['business'].remove(done);
};

describe('RESTful API', function () {
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect('mongodb://localhost/fearlessgerbil', done);

  });
  
  after(function (done) {
    mongoose.connection.collections['message'].remove(done);
  });

  describe('/api/messages', function () {

    before(function (done) {
      clearDB(function () {

      });
      return done();
    });

    describe('GET', function () {

      before(function (done) {
        var newBusiness = {
          username: 'cc',
          password: 'cc',
          name: 'cc',
          address: 'co',
          phone: '3',
          website: 'www.cc.com',
          email: 'cc@cc.com'
        };

        var businessCopy = JSON.parse(JSON.stringify(newBusiness));
        Business.create(businessCopy, function (err) {
          if (err) {
            console.log(err, "Before Each");
            throw err;
          }
        }).then(function (business) {
          var testItems = [
          {
            item: 'boots',
            price: 10,
            desc: 'ski',
            amt: 1,
            isIn: true,
            img: 'img1',
            businessId: business._id,
            dates: []
          },
          {
            item: 'football',
            price: 9,
            desc: 'sports',
            amt: 2,
            isIn: true,
            img: 'img2',
            businessId: business._id,
            dates: []
          }
          ];
          var itemCopy = JSON.parse(JSON.stringify(testItems));
          Item.create(itemCopy, function (err) {
            if (err) {
              console.log(err, "Before Each");
              throw err;
            }
          }).then(function (items) {
            var testMessage = {
              name: 'zack',
              email: 'zack@zack.com',
              phone: '22',
              dates: [],
              items: [items[0]._id, items[1]._id],
              businessId: business._id
            };
            var messageCopy = JSON.parse(JSON.stringify(testMessage));
            Message.create(messageCopy, function (err, messages) {
              if (err) {
                console.log(err, "Before Each");
                throw err;
              }
            }); 
          });
        });
        done();     
      });

      it('responds with a 200 (OK) and all messages', function (done) {    
        
        request(app)
          .get('/api/messages')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, resp) {
            expect(resp.body.length).to.equal(1);
            expect(resp.body[0].name).to.equal('zack');
            done();
          });
      });

    });
  
  });

  describe('/api/messages', function () {
  
    describe('POST AND GET', function () {

      it('responds with a 201 (Created) when a valid message is sent', function (done) {
        Message.find({name: 'zack'}, function(err, message) {
          if (err) {
            console.log(err);
          }

          var newMessage = {
            name: 'dan',
            email: 'dan@dan.com',
            phone: 'dd',
            dates: [],
            items: message[0].items,
            businessId: message[0].businessId
          };

          var busid = null;

          request(app)
            .post('/api/messages')
            .send(newMessage)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, resp) {
              busid = resp.body.businessId;
              request(app)
                .get('/api/messages/'+busid)
                .set('Accept', 'application/json')
                .end(function (err, resp) {
                  expect(resp.body.length).to.equal(2);
                });
            });
          done();
        });
      });

    });
  });

  describe('/api/messages/:messageid', function () {

    describe('DELETE', function () {

      it('responds with a 200 (OK)', function (done) {
        Message.find({name: 'zack'}, function(err, message) {
          if (err) {
            console.log(err);
          }
          request(app)
            .delete('/api/messages/'+message._id)
            .end(function (err, resp) {
              expect(resp.body.messages).to.equal('deleted');
            });

          done();
        });

      });

    });

  }); 

});
