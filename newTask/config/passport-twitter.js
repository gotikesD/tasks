"use strict";

var passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new TwitterStrategy({
        consumerKey: 'U0FttBRTu5KVhC382VUzVRe5v',
        consumerSecret: 'FBqRQ93N35xCBMph4bJlObkUkn3KP32kIFKrh0ZIMxOEY0Vfxm',
        callbackURL: "http://127.0.0.1:3000/session/twitter/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        })
    })
);




