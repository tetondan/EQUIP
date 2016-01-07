var mongoose = require('mongoose');

var mesageSchema = mongoose.Schema({
  name: {type: String, required: true},
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  buisness: {type: Schema.Types.ObjectId, ref: 'Buisness'},
  email: {type: String},
  phone: {type: String}
})

var Message = mongoos.model('Message', messageSchema)

module.exports = Message;