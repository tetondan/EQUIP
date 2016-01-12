var Item = require('../models/item');
var Business = require('../models/business');
var express = require('express');
var router = express.Router();

//gets ALL items in the database, not really good for anything but testing;
router.route('/items').get(function (req, res) {
  Item.find(function(err, items){
    if(err){
      console.log(err)
    };
    res.status(200).send(items);
  })
});

//creates a new item in the database, (item, price, amount, and business id are required);
router.route('/items').post(function (req, res) {
  var data = req.body;
  var item = new Item({
    item: data.item,
    price: data.price,
    desc: data.desc,
    amt: data.amt,
    img: data.img,
    businessId: data.businessId,
    dates: data.dates || []
    });
  item.save(function (err) {
    if (err){
      console.log(err);
      res.status(404);
    } else {
      res.status(201).send({id: item._id});
    }
  });
});

//gets an item by the item id;
router.route('/items/:id').get(function (req, res) {
  var itemId = req.params.id;
  Item.findById(itemId, function(err, item){
    res.status(200).send(item);
  });
});

//allows the business owner to update items by the item id;
router.route('/items/:id').put(function (req, res) {
  var newItem = req.body;
  Item.findById(req.params.id, function(err, item){
    console.log(item);
    if(item !== undefined){
      for(var key in req.body){
        item[key] = req.body[key];
        item.save(function(err){
          if(err){
            // TODO: need to resolve if can't save item
            console.log(err);
          } else {
            res.status(200).send(item);
          }
        });
      }
    } else { 
      res.status(404).send('Item not found')
    }
  });
});

//allows the business owner to delete items from inventory;
router.route('/items/:id').delete(function (req, res) {
  var itemId = req.params.id;
  Item.find({'_id': itemId}, function(err, item){
    if(item !== undefined){  
      Item.remove({'_id': itemId}, function(err, item){
        res.status(200).send(item);
      });
    } else {
      res.status(404).send('item not found')
    } 
  })
});

//gets all items by buisness id (to be used for customer view page);
router.route('/items/getall/:busid').get(function (req, res){
  var busId = req.params.busid;
  Item.find({businessId: busId}, function(err, items){
    res.status(200).send(items);
  });
});

module.exports = router;
