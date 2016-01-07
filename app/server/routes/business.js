var Business = require('../models/business');
var express = require('express');
var router = express.Router();

///app.get('/:code', linksController.navToLink);
router.route('/businesses/signin').get(function (req, res) {

});

router.route('/businesses/signup').post(function (req, res) {
  var data = req.body
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
    } else {
      res.status(201).send(data.username); 
    }
  })
});

router.route('/businesses/signedin').get(function (req, res) {

});

router.route('/businesses').get(function (req, res) {

});

// router.route('/business').post(function (req, res) {
// });

router.route('/businesses/:name').put(function (req, res) {

});

router.route('/businesses/:name').get(function (req, res) {

});

router.route('/businesses/:name').delete(function (req, res) {

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

