var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  name: {type: String, required: true},
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  business: {type: Schema.Types.ObjectId, ref: 'Business'},
  email: {type: String},
  phone: {type: String}
});

var Message = mongoose.model('Message', messageSchema);



module.exports = Message;