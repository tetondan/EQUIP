var mongoose = require('mongoose');

var buisnessSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: {type: String},
  phone: {type: String},
  website: {type: String},
  email: {type: String}
});

var Buisness = mongoose.model('Buisness', buisnessSchema);


module.exports = User;