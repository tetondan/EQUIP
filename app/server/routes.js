var inventoryController = require('./inventoryCtrl.js');
var businessController = require('./businessCtrl.js');

module.exports = function (app, express) {
  ///app.get('/:code', linksController.navToLink);

  app.post('/api/business/signin', businessController.signin);
  app.post('/api/business/signup', businessController.signup);
  app.get('/api/business/signedin', businessController.checkAuth);

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/links', helpers.decode);
  app.get('/api/inventory/', inventoryController.allInventory);
  app.post('/api/inventory/', inventoryController.newInventory);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);
};

