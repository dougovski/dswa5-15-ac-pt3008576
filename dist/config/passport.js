var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    
    var Usuario = mongoose.model('Usuario');
    passport.use(new GitHubStrategy({
    clientID: '0d93553e7ed984e791d3',
    clientSecret: 'e4f03b51a422b76fb88d8067a81e2c1c53a3f601',
    callbackURL: 'https://dswa5-15-ac-pt3008576.herokuapp.com/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            { "login" : profile.username},
            { "nome" : profile.username},
            function(erro, usuario) {
            if(erro){
            console.log(erro);
            return done(erro);
            }
            return done(null, usuario);
            }
        );
    }));
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
            done(null, usuario);
        });
    });
};


// be0669de4c78db73fb30247e7db327f3ba2ca7e9
