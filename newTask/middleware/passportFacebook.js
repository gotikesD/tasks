

require('../config/passport-facebook');
var passport = require('passport');


module.exports = {
    firstStep : passport.authenticate('facebook', { scope: ['email']}),

    secondStep :  passport.authenticate('facebook', {
        successRedirect: '/session/facebook/success',
        failureRedirect: '/session/facebook/error'
    })
};

