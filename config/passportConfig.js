var GitHubStrategy = require('passport-github2').Strategy;
var oauth = require("./oauth");
var User = require("../models/userModel");

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		User.findById(user._id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
			clientID: oauth.github.clientID,
			clientSecret: oauth.github.clientSecret,
			callbackURL: oauth.github.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {
				User.findOne({
					'id': profile.id
				}, function(err, user) {
					if (err)
						return (err);
					if (user)
						return done(null, user);
					else {
						var newUser = new User();

						newUser.id = profile.id;
						newUser.token = accessToken;
						newUser.name = profile._json.name;
						newUser.email = profile._json.email;
						newUser.username = profile.username;

						newUser.save(function(err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			});
		}

	));

};