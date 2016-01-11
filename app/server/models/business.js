var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;


var businessSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: {type: String},
  phone: {type: String},
  website: {type: String},
  email: {type: String},
  inventory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
  salt: String
}, {collection: 'business'});



businessSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return Q.Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

businessSchema.pre('save', function (next) {
  var business = this;

  // only hash the password if it has been modified (or is new)
  if (!business.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(business.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      business.password = hash;
      business.salt = salt;
      next();
    });
  });
});

var Business = mongoose.model('Business', businessSchema);


module.exports = Business;