
require('../config/passport-twitter');
var passport = require('passport');


module.exports = {
    firstStep : passport.authenticate('twitter', { scope: ['email']}),

    secondStep :  passport.authenticate('twitter', {
        successRedirect: '/session/twitter/success',
        failureRedirect: '/session/twitter/error'
    })
};

