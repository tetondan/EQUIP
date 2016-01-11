var Message = require('../models/message');
var Item = require('../models/item');
var Business = require('../models/business')
var express = require('express');
var router = express.Router();

//gets all messages, not usfule for anything other than testing, user should not be able to access this route.
router.route('/messages').get(function (req, res) {
  Message.find(function(err, msgs){
    if(err){console.log(err)};
    console.log(msgs)
    res.status(200).send(msgs);
  })
});
//allows the client to post a new message to the business when someone reserves an item
router.route('/messages').post(function (req, res) {
  var message = new Message({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dates: req.body.dates,
    items: req.body.items,
    businessId: req.body.businessId
  })
  //after newitem is created, mongoose will then find the items refernced in the new message object, find the item and update its dates array
  //indicating the item is not available on those dates. After that is finished, it will then send the message object back to the client.
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
//alows the business to get all of its messages
router.route('/messages/:busid').get(function (req, res) {
  Message.find({businessId: req.params.busid})
    .populate({path: 'items'})  
    .exec(function(err, messages){
      if(err){console.log(err)}
      res.status(200).send(messages);
      console.log(messages)
    })
});
//allows the removal of messages from the db, after the business is done reading/using them.
router.route('/messages/:messageid').delete(function (req, res) {
  Message.remove({_id: req.params.messageid}, function(err){
    if(err){console.log(err)};
    res.send({messages: 'deleted'});
  })
});

module.exports = router;
