var Message = require('../models/message');
var Item = require('../models/item');
var Business = require('../models/business')
var express = require('express');
var router = express.Router();

///app.get('/:code', linksController.navToLink);

router.route('/messages').post(function (req, res) {
  var message = new Message({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dates: req.body.dates,
    items: req.body.items
  })
  message.save(function(err){
    if(err){console.log(err)}
    req.body.items.forEach(function(itemid){
      Item.findOne({_id: itemid}, function(err, item){
        item.dates = item.dates.concat(req.body.dates);
        item.save(function(err){
          if (err) {
            console.log(err);
            res.send(err);
          }
        })
      })
    })
    res.status(200).send('received')
  })
});

router.route('/messages/:busid').put(function (req, res) {
  Message.find({businessId: req.params.busId}, function(err, messages){
    res.status(200).send(messages);
  })

});

router.route('/messages/:name').get(function (req, res) {

});

router.route('/messages/').delete(function (req, res) {
  Message.remove({}, function(err){
    if(err){console.log(err)};
    res.send('deleted')
  })
});

module.exports = router;

