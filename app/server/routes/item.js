var Item = require('../models/item');
var Business = require('../models/business');
var express = require('express');
var router = express.Router();

///app.get('/:code', linksController.navToLink);
router.route('/items').get(function (req, res) {

});

router.route('/items').post(function (req, res) {
  var data = req.body
  var item = new Item({
    item: data.item,
    price: data.price,
    desc: data.desc,
    amt: data.amt,
    isIn: true,
    img: data.img,
    dates: [data.dates]
    });
  item.save(function (err) {
    if (err){
      console.log(err);
      res.status(404);
    } else {
      console.log(item);
      console.log(item._id);
      Business.findById(req.body.businessId, function(err, business){
        if(err){console.log(err)};
        business.inventory.push(item._id);
        console.log('saved')
      });
      res.status(200).send(data.item); 
    }

  })
});

router.route('/items/:id').put(function (req, res) {

});

router.route('/items/:id').get(function (req, res) {

});

router.route('/items/:id').delete(function (req, res) {

});

module.exports = router;

// new Item = {
//   item: {type: String, required: true},
//   price: {type: Number, required: true},
//   desc: {type: String},
//   amt: {type: Number, required: true},
//   isIn: {type: Boolean, required: true},
//   img: {type: String},
//   dates: [{type: Number}]
// }

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

