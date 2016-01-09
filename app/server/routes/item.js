var Item = require('../models/item');
var Business = require('../models/business');
var express = require('express');
var router = express.Router();

///app.get('/:code', linksController.navToLink);
router.route('/items').get(function (req, res) {
  Item.find(function(err, items){
    if(err){console.log(err)};
    res.status(200).send(items)
  })
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
    businessId: data.businessId,
    dates: data.dates || []
    });
  item.save(function (err) {
    if (err){
      console.log(err);
      res.status(404);
    } else {  
      res.status(200).send(item._id); 
    }

  })
});
//does not work, do not use
router.route('/items/checkout/:id').get(function (req, res) {
  var itemId = req.params.id;
  Item.update({'_id': itemId},{
    isIn: false
  }, function(err, num, raw) {
   if(err){console.log(err)};
    res.send(num);
  })
});

router.route('/items/checkin/:id').get(function (req, res) {
  var itemId = req.params.id;
  Item.update({'_id': itemId},{
    isIn: true
  }, function(err, num, raw) {
   if(err){console.log(err)};
    res.send(num);
  })
});

router.route('/items/:id').get(function (req, res) {
  var itemId = req.params.id;
  Item.findById(itemId, function(err, item){
    res.status(200).send(item)
  })

});

router.route('/items/:id').put(function (req, res) {
  var newItem = req.body
  Item.findById(req.params.id, function(err, item){
    console.log(req.body)
    for(var key in req.body){
      item[key] = req.body[key];
    }
    item.save(function(err){
      if(err){console.log(err)}
      res.status(200).send(item)
    })
  })

});

router.route('/items/:id').delete(function (req, res) {
  var itemId = req.params.id;
  Item.remove({'_id': itemId}, function(err, item){
    res.status(200).send('removed')
  })

});

router.route('/items/getall/:busid').get(function (req, res){
  var busId = req.params.busid
  Item.find({businessId: busId}, function(err, items){
    res.status(200).send(items)
  })
})

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


