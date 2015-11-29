var GitHubStrategy = require('passport-github2').Strategy;
var oauth = require("./oauth");
var User = require("../models/userModel");

module.exports = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
			clientID: oauth.github.clientID,
			clientSecret: oauth.github.clientSecret,
			callbackURL: oauth.github.callbackURL
		},
		(accessToken, refreshToken, profile, done) => {
			process.nextTick(() => {
				User.findOne({'githubId': profile.id }, (err, user) => {
					if (err)
						return (err);
					if (user)
						return done(null, user);
					else {
						var newUser       = new User();
						newUser.username  = profile.username;
						newUser.name      = profile._json.name;
						newUser.email     = profile._json.email;
						newUser.gitToken  = accessToken;
						newUser.githubId  = profile.id;
						newUser.save(err => {
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