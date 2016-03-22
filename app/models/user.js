var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var authUser = new Schema({
    username: {type: String, lowercase: true, unique: true},
    hash: String,
    salt: String
});

authUser.methods.setPassword = function(pwd){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64).toString('hex');
};

authUser.methods.validPassword = function(pwd){
  var hash1 = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64).toString('hex');

  return hash1 === this.hash;
};

authUser.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  // exp.setMinutes(today.getMinutes() + 2); /// 2 minutes later it will expire()
  exp.setDate(today.getDate() + 1); /// 1 day later it expires

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.SECRET_CRYPTO || 'secret');
};

module.exports = mongoose.model('User', authUser);

