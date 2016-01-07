var GitHubStrategy = require('passport-github2').Strategy;
var secrets = require("./secrets");
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
			clientID: secrets.github.clientID,
			clientSecret: secrets.github.clientSecret,
			callbackURL: secrets.github.callbackURL
		},
		(accessToken, refreshToken, profile, done) => {
			process.nextTick(() => {
				User.findOne({'githubId': profile.id }, (err, user) => {
					if (err) {
						return (err);
					}
					if (user) {
						return done(null, user);                        
                    }
					else {
						var newUser          = new User();
						newUser.username     = profile.username;
						newUser.name         = profile._json.name;
						newUser.email        = profile._json.email;
						newUser.gitToken     = accessToken;
						newUser.githubId     = profile.id;
						newUser.avatar_url   = profile._json.avatar_url;
						newUser.apiUrl       = profile._json.url ;
						newUser.company      = profile._json.company;
						newUser.blog         = profile._json.blog ;
						newUser.location     = profile._json.location;
						newUser.hireable     = profile._json.hireable;
						newUser.bio          = profile._json.bio;
						newUser.createdGit   = profile._json.created_at;
						newUser.updatedGit   = profile._json.updated_at;
						newUser.profileUrl   = profile.profileUrl;
						newUser.displayName  = profile.displayName;
						console.log(newUser);
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