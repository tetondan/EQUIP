var Business = require('../models/business');
var express = require('express');
var router = express.Router();
var authController = require('../helpers/authController.js');
var helpers = require('../helpers/helpers.js');

router.route('/businesses/signin').post(authController.signin);

router.route('/businesses/signup').post(authController.signup);

//router.route('/businesses/signedin').get(authController.checkAuth);

router.route('/businesses').get(function (req, res) {
  Business.find({}, function (err, all) {
    if (err) {
      console.log(err);
    }
    
    var businessMap = {};
    all.forEach(function (business) {
      businessMap[business._id] = business;
    });
    res.status(200);
    res.send(businessMap); 
  });


});

router.route('/businesses/:id').put(function (req, res) {
  Business.findOne({'_id': req.params.id}, function (err, business) {
    if (err) {
      console.log(err);
      res.send(err);
    } 
    for (var prop in req.body) {
      business[prop] = req.body[prop];
    }
    
    business.save(function (err, newBusiness) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.status(200);
      res.json(newBusiness);
    });

  });

});

router.route('/businesses/:id').get(function (req, res) {
  Business.findOne({'_id': req.params.id}, function (err, business) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.status(200);
    res.json(business);
  });

});

router.route('/businesses/:id').delete(function (req, res) {
  Business.remove({'_id': req.params.id}, function (err, business) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.status(200);
    res.json({messages: 'business removed'});
  });

});

module.exports = router;
