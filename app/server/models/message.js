var mongoose = require('mongoose');
var Business = require('./business');
var Item = require('./item');

var messageSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String},
  phone: {type: String},
  dates: [{type: Date}],
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  businessId: {type: mongoose.Schema.Types.ObjectId, ref: 'Business'}
});

var Message = mongoose.model('Message', messageSchema);

console.log('messages is being initiated')

module.exports = Message;
