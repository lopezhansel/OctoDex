var User = require("../models/userModel");

module.exports = (app, passport) => {

	app.get('/', (req, res) => {
			res.sendFile('index.html', {root: './public/views'});
	});


	app.get('/user/:username',function (req,res) {
		User.findOne(req.params, (err,user) => {
			// need better error handling for if user not found
			if (err) { res.send(null);}
			else{
				if(user &&  user.gitToken) { user.gitToken = null;} 
				res.send(user);
			}
		});
	});

	app.get('/api/me', ensureAuthenticatedAjax,  (req,res) => {
			if (req.user){
			User.findById(req.user._id, (err, user) => {
				if(err) { res.send("err");}
				user.gitToken = null;
				res.send(user);
			});
		}else{
			res.send(null);
		}
	});

	app.put('/api/me', ensureAuthenticatedAjax,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send("err");}
			user.displayName = req.body.displayName;
			user.bio = req.body.bio;
			user.hireable = req.body.hireable;
			user.location = req.body.location;
			user.blog = req.body.blog;
			user.company = req.body.company;
			user.email = req.body.email;
			user.name = req.body.name;
			user.save(function (err) {
				if(err) { res.send("err");}
				user.gitToken = null;
				res.send(user);
			});
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

	app.get('/auth/github', passport.authenticate('github', {scope: ['user']}), (req, res) => {

	});

	app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
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
		if (req.isAuthenticated()) {return next(); }
		res.redirect('/');
	}
	
	function ensureAuthenticatedAjax (req, res, next) {
	    if (req.isAuthenticated()) { return next(); }
	    res.send({ error: 'not logged in' });
	}

};