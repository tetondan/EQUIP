var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String},
  phone: {type: String},
  dates: [{type: Number}],
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

var Message = mongoose.model('Message', messageSchema);



module.exports = Message;