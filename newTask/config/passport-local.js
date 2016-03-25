
var User = require('../models/schema');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');

module.exports = passport.use('myStrategy',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {

        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(md5(password))) {
                return done(null, false, { message: 'Incorrect password.' });
            }else {
                return done(null, user);
            }

        });
    }))

