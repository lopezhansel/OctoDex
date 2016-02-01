var User = require("../models/userModel");

module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.sendFile('index.html', {root: './public/views'});
	});

	app.get('/api/me', ensureAuthenticatedAjax,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			user.gitToken = null;
			res.send(user);
		});
	});

	app.post('/api/me', ensureAuthenticatedAjax,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			user.bio = req.body.bio;
			user.hireable = req.body.hireable;
			user.location = req.body.location;
			user.blog = req.body.blog;
			user.company = req.body.company;
			user.email = req.body.email;
			user.name = req.body.name;
			user.reposArray = req.body.reposArray;
			user.followersArray = req.body.followersArray;
			user.save((err) => {
				if(err) { res.send({ error: 'Sorry something went wrong' });}
				else{
					user.gitToken = null;
					res.send(user);
				}
			});
		});
	});

	app.get("/api/users/:username", (req,res)=>{ // gets one
		User.find(req.params,(err,user)=>{
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			else{
				user.gitToken = null;
				res.send(user);
			}
		});
	});


	app.get("/api/users/", (req,res)=>{	 
		var projection = req.query.projection;
		delete req.query.projection;
		User.find(req.query,projection,(err,users)=>{
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			else{
				if(!projection){users.forEach( (e) => e.gitToken = null);}
				res.send(users);
			}
		});
	});

	app.get('/auth/github', passport.authenticate('github', {scope: ['user']}), (req, res) => {});
	
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