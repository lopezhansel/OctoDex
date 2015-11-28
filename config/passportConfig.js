const GitHubStrategy = require('passport-github2').Strategy;
console.log(GitHubStrategy);

const oauth = require("./oauth");

const User = require("../models/userModel");



module.exports = function (passport) {

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
	    //  githubId: profile.id
	    // }, function(err, user) {
	    //  console.log(user);
	    //  return done(err, user);
	    // });
	  }
	));
	
};