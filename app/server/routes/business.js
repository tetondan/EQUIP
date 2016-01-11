var Business = require('../models/business');
var express = require('express');
var router = express.Router();

///app.get('/:code', linksController.navToLink);
router.route('/businesses/signin').get(function (req, res) {

});

router.route('/businesses/signup').post(function (req, res) {
  var data = req.body;
  console.log(data);
  var business = new Business({
    username: data.username,
    password: data.password,
    name: data.name,
    address: data.address,
    phone: data.phone,
    website: data.website,
    email: data.email
    });
  business.save(function (err) {
    if (err){
      console.log(err);
      res.status(404);
    }
  }).then(function (newUser) {
    res.status(201).send(newUser);     
  });
});

router.route('/businesses/signedin').get(function (req, res) {

});

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

// router.route('/business').post(function (req, res) {
// });

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


// app.post('/api/business/signin', businessController.signin);
// app.post('/api/business/signup', businessController.signup);
// app.get('/api/business/signedin', businessController.checkAuth);

// authentication middleware used to decode token and made available on the request
// app.use('/api/links', helpers.decode);
// app.get('/api/inventory/', inventoryController.allInventory);
// app.post('/api/inventory/', inventoryController.newInventory);

// If a request is sent somewhere other than the routes above,
// send it through our custom error handler
// app.use(helpers.errorLogger);
// app.use(helpers.errorHandler);

