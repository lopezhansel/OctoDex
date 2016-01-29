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
				User.findOne({'githubId': profile.id }, (err, userDoc) => {
					if (err) {
						return (err);
					}
					if (userDoc) {
						userDoc.followerNum = profile._json.followers;
						userDoc.followingNum = profile._json.following;
						userDoc.updatedGit    = profile._json.updated_at;
						userDoc.publicRepos  = profile._json.public_repos;
						userDoc.publicGists  = profile._json.public_gists;

						userDoc.save(err => {
							if (err){throw err; }
							return done(null, userDoc);
						});                   
                    }
					else {
						var newUserDoc           = new User();
						// The following Properties don't Change
						newUserDoc.username      = profile.username;
						newUserDoc.email         = profile.emails[0].value;
						newUserDoc.githubId      = profile.id;
						newUserDoc.avatar_url    = profile._json.avatar_url;
						newUserDoc.apiUrl        = profile._json.url ;
						newUserDoc.bio           = profile._json.bio;
						newUserDoc.profileUrl    = profile.profileUrl;
						newUserDoc.createdGit    = profile._json.created_at;
						newUserDoc.gitToken      = accessToken;
						// The following Properties DO change, but don't affect my Mongo
						newUserDoc.name          = profile._json.name;
						newUserDoc.company       = profile._json.company;
						newUserDoc.blog          = profile._json.blog ;
						newUserDoc.location      = profile._json.location;
						newUserDoc.hireable      = (profile._json.hireable)? "Available for hire" : "Not available for hire";
						// The following Properties DO change, and  DO affect my Mongo
						newUserDoc.updatedGit    = profile._json.updated_at;
						newUserDoc.followerNum   = profile._json.followers;
						newUserDoc.followingNum  = profile._json.following;
						newUserDoc.publicGists   = profile._json.public_gists;
						newUserDoc.publicRepos   = profile._json.public_repos;

						newUserDoc.save(err => {
							if (err){throw err; }
							return done(null, newUserDoc);
						});
					}
				});
			});
		}

	));

};