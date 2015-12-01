var User = require("../models/userModel");

module.exports = (app, passport) => {

	app.get('/', (req, res) => {
			res.sendFile('index.html', {root: './public/views'});
	});

	app.get('/home', ensureAuthenticated, (req, res) => {
		// for testing purposes only 
		res.send('Welcome Home');
	});

	app.get('/api/me', ensureAuthenticatedAjax,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send("err");}
			user.gitToken = null;
			res.send(user);
		});
	});

	app.put('/api/me', ensureAuthenticatedAjax,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send("err");}
			user.gitToken = null;
			res.send(user);
		});
	});

	app.get('/api/users/:userParams', ensureAuthenticatedAjax , (req,res) => {
		// find latest 10 public profiles
	});

	app.get('/card/:githubId', ensureAuthenticatedAjax, (req,res) => {
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
		console.log("here");
		req.logIn(req.user, err => {
			if (err) {return next(err); }
			// ENABLE CORS LATER
			return res.redirect('/');
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
	
	function ensureAuthenticatedAjax (req, res, next) {
	    if (req.isAuthenticated()) { return next(); }
	    res.send({ error: 'not logged in' });
	}

};