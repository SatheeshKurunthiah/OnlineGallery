var User = require('../models/User.js');
var LocalStrategy = require('passport-local').Strategy;

var strategyOption = {
  usernameField: 'email'
};


exports.login = new LocalStrategy(strategyOption, function(email, password, done) {

  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if (err) return done(err);

    if (!user)
      return done(null, false, {
        message: 'No User Found in Database'
      });

    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);

      if (!isMatch)
        return done(null, false, {
          message: 'Wrong Password'
        });

      return done(null, user);

    });
  })
});

exports.register = new LocalStrategy(strategyOption, function(email, password, done) {
  var newUser = new User({
    email: email,
    password: password
  });
  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if (err) return done(err);

    if (user)
      return done(null, false, {
        message: 'The user is already registered..!!'
      });
  });
  console.log('inside register strategy');
  newUser.save(function(err) {
    done(null, newUser);
  })
})
