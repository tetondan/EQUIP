var Business = require('../models/business');
var express = require('express');
var router = express.Router();

///app.get('/:code', linksController.navToLink);
router.route('/business/signin').get(function (req, res) {

});

router.route('/business/signup').get(function (req, res) {

});

router.route('/business/signedin').get(function (req, res) {

});

router.route('/business').get(function (req, res) {

});

router.route('/business').post(function (req, res) {

});

router.route('/business/:name').put(function (req, res) {

});

router.route('/business/:name').get(function (req, res) {

});

router.route('/business/:name').delete(function (req, res) {

});

module.exports = router;


// app.post('/api/business/signin', businessController.signin);
// app.post('/api/business/signup', businessController.signup);
// app.get('/api/business/signedin', businessController.checkAuth);

// authentication middleware used to decode token and made available on the request
// app.use('/api/links', helpers.decode);
app.get('/api/inventory/', inventoryController.allInventory);
app.post('/api/inventory/', inventoryController.newInventory);

// If a request is sent somewhere other than the routes above,
// send it through our custom error handler
// app.use(helpers.errorLogger);
// app.use(helpers.errorHandler);

