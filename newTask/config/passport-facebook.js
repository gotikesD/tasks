"use strict";

var User = require('../models/schema');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use('facebook',new FacebookStrategy({
        clientID: '914348468681625',
        clientSecret: 'bd2cd74e287ae399c64dff0b352a9d72',
        callbackURL: "http://localhost:3000/session/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            console.log(profile)
            done(null, profile);
     })
    })
)




