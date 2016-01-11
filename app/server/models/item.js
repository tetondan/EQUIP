var mongoose = require('mongoose');
var Business = require('./business');

//businessId needs to be a valid mongo ObjectId from an already created business
var itemSchema = mongoose.Schema({
  item: {type: String, required: true},
  price: {type: Number, required: true},
  desc: {type: String},
  amt: {type: Number, required: true},
  img: {type: String},
  dates: [{type: Date}],
  businessId: {type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true}
}, {collection: 'item'});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
