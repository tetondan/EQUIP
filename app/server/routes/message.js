var Message = require('../models/message');
var Item = require('../models/item');
var Business = require('../models/business')
var express = require('express');
var router = express.Router();

///app.get('/:code', linksController.navToLink);
router.route('/messages').get(function (req, res) {
  Message.find(function(err, msgs){
    if(err){console.log(err)};
    console.log(msgs)
    res.status(200).send(msgs);
  })
});

router.route('/messages').post(function (req, res) {
  var message = new Message({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dates: req.body.dates,
    items: req.body.items,
    businessId: req.body.businessId
  })
  // message.save(function(err){res.send(200)})
  message.save(function(err){
    if(err){console.log(err)}
    req.body['items'].forEach(function(itemid){
      Item.find({_id: itemid}, function(err, item){
        item[0].dates = item[0].dates.concat(req.body['dates']);
        console.log(item[0].dates)
        item[0].save(function(err){
          if (err) {
            console.log(err);
            res.send(err);
          }
        })
      })
    })
    res.status(201).send(message)
  })
});

router.route('/messages/:busid').get(function (req, res) {
  Message.find({businessId: req.params.busid})
    .populate({path: 'items'})  
    .exec(function(err, messages){
      if(err){console.log(err)}
      res.status(200).send(messages);
      console.log(messages)
    })
});

router.route('/messages/:messageid').delete(function (req, res) {
  Message.remove({}, function(err){
    if(err){console.log(err)};
    res.send('deleted')
  })
});

module.exports = router;
