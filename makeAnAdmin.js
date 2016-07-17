//run this from the terminal with 'node makeAnAdmin.js' and insert into mongo

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

function AuthUser(username){
    this.username = username,
    this.hash = '',
    this.salt = ''
}


AuthUser.prototype.setPassword = function(pwd){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64).toString('hex');
  console.log('this.hash')
  console.log(this.hash)
  console.log('this.salt')
  console.log(this.salt)
};

// var admin = new AuthUser('bray')
// admin.setPassword('bray')
// console.log(admin)
