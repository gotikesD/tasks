"use strict";

var User = require('../models/schema');
var passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: '588667797186-4ektui56p8f66qmlsdc9vkepcptmv8f8.apps.googleusercontent.com',
        clientSecret: 'ps-8UNTP9qblJTEXaLrMKFYF',
        callbackURL: "http://localhost:3000/session/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            console.log(profile)
            done(null, profile);
        })
    })
)




