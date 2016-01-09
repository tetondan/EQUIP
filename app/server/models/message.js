var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String},
  phone: {type: String},
  dates: [{type: Number}],
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  businessId: {type: mongoose.Schema.Types.ObjectId, ref: 'Business'}
});

var Message = mongoose.model('Message', messageSchema);



module.exports = Message;