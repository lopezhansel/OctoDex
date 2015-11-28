const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
mongoose.connect('mongodb://localhost/virtualBusinessCard');
const User = require('./models/userModel.js');

const oauth = require("./config/oauth");

const app = express();
module.exports = app;
require("./controllers/routeCtrl");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.use(express.static(__dirname + '/public'));



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
		clientID: oauth.github.clientID,
		clientSecret: oauth.github.clientSecret,
		callbackURL: oauth.github.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    
		// User.findOrCreate({
		// 	githubId: profile.id
		// }, function(err, user) {
		// 	console.log(user);
		// 	return done(err, user);
		// });
	}
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
});

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
 
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


var port = 80;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
