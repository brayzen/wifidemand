var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash         = require('express-flash');
var SHA256        = require("crypto-js/sha256");
var User          = require('../app/models/user');


//Set up local strategy ==================================

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user){
    if(err){
      console.log('Passport message: "Error/failed, incorrect username, cant be found"');
      return done(null, false, {message: "Error/failed, incorrect username, can't be found"});
    }
    if (!user) {
      console.log('Passport message: "failed,  correct DB query, cant find user"');
      return done(null, false, {message: "failed, correct DB query, can't find user"});
    }
    if (!user.validPassword(password)) {
      console.log('Passport message: "failed,  Incorrect password"');
      return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
    done(null, SHA256(user.id, process.env.SECRET_CRYPTO || 'secret'));
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    SHA256.decrypt(id, process.env.SECRET_CRYPTO || 'secret');
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
