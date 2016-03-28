"use strict";

var passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID:     '588667797186-4ektui56p8f66qmlsdc9vkepcptmv8f8.apps.googleusercontent.com',
        clientSecret: 'ps-8UNTP9qblJTEXaLrMKFYF',
        callbackURL: "http://localhost:3000/session/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {

            return done(null, profile);
    }
));




