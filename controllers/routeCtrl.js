var User = require("../models/userModel");

module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		if(!req.isAuthenticated()){
			// if not logged in send a light weight version 
			res.sendFile('index.html', {root: './public/views'});
		}
		if(req.isAuthenticated()){
			// Send a full version of the app
			res.send("Welcome Home");
		}
	});

	app.get('/home', ensureAuthenticated, (req, res) => {
		// for testing purposes only 
		res.send('Welcome Home');
	});

	app.get('/api/me', ensureAuthenticated,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send("err");}
			user.gitToken = null;
			res.send(user);
		});
	});

	app.get('/api/users/:userParams', ensureAuthenticated, (req,res) => {
		// find latest 10 public profiles
	});

	app.get('/card/:githubId', ensureAuthenticated, (req,res) => {
		User.findOne(req.params, (err,user) => {
			// need better error handling for if user not found
			if (err) { res.send(null);}
			else{
				if(user &&  user.gitToken) { user.gitToken = null;} 
				res.send(user);
			}
		});
	});

	app.get('/auth/github', passport.authenticate('github', {scope: ['user:email'] }), (req, res) => {

	});

	app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
		req.logIn(req.user, err => {
			if (err) {return next(err); }
			return res.redirect('/home');
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	function ensureAuthenticated (req, res, next) {
		// if (req.isAuthenticated()) {return next(); }
		// res.redirect('/');
		console.log("bypassing isAuthenticated while developing");
		return next();
	}


};