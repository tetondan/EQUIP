var mongoose = require('mongoose');
var Business = require('./business'); 

var itemSchema = mongoose.Schema({
  item: {type: String, required: true},
  price: {type: Number, required: true},
  desc: {type: String},
  amt: {type: Number, required: true},
  isIn: {type: Boolean, required: true},
  img: {type: String},
  dates: [{type: Date}],
  businessId: {type: mongoose.Schema.Types.ObjectId, ref: 'Business'}
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;

