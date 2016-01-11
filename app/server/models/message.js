var mongoose = require('mongoose');
var Business = require('./business');
var Item = require('./item');

//must include name and businessId
var messageSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String},
  phone: {type: String},
  dates: [{type: Date}],
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  businessId: {type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true}
}, {collection: 'message'});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
