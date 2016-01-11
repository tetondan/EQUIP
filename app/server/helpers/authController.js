var Business = require('../models/business.js');
    Q = require('q');
    jwt = require('jwt-simple');

var findBusiness = Q.nbind(Business.findOne, Business);
var createBusiness = Q.nbind(Business.create, Business);

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    findBusiness({username: username})
      .then(function (business) {
        if (!business) {
          next(new Error('Business does not exist'));
        } else {
          return business.comparePasswords(password)
            .then(function (foundBusiness) {
              if (foundBusiness) {
                var token = jwt.encode(business, 'secret');
                console.log(".............");
                console.log(business);
                res.send({id: business._id, token: token});
                //res.json({token: token});
              } else {
                return next(new Error('No business'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var website = req.body.website;
    var email = req.body.email;

    // check to see if user already exists
    findBusiness({username: username})
      .then(function (business) {
        if (business) {
          next(new Error('Business already exist!'));
        } else {
          // make a new user if not one
          return createBusiness({
            username: username,
            password: password,
            name: name,
            address: address,
            phone: phone,
            website: website,
            email: email
          });
        }
      })
      .then(function (business) {
        // create token to send back for auth
        var token = jwt.encode(business, 'secret');
        res.send({id: business._id, token: token});
        //res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var business = jwt.decode(token, 'secret');
      findBusiness({username: business.username})
        .then(function (foundBusiness) {
          if (foundBusiness) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
