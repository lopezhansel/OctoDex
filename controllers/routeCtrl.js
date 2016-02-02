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
		User.findById(req.user._id, (err, me) => {
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			me.bio            = req.body.bio;
			me.hireable       = req.body.hireable;
			me.location       = req.body.location;
			me.blog           = req.body.blog;
			me.company        = req.body.company;
			me.email          = req.body.email;
			me.name           = req.body.name;
			me.reposArray     = req.body.reposArray;
			me.followersArray = req.body.followersArray;
			me.save((err) => {
				if(err) { res.send({ error: 'Sorry something went wrong' });}
				else{
					me.gitToken = null;
					res.send(me);
				}
			});
		});
	});

	app.post("/api/users/:login", ensureAuthenticatedAjax, (req,res)=>{ 
		User.find(req.params,(err,users)=>{
			if (!users.length) {return;} // Bug: if it doesn't find one CRASH
			var userDoc = users[0];
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			userDoc.bio            = req.body.bio;
			userDoc.hireable       = req.body.hireable;
			userDoc.location       = req.body.location;
			userDoc.blog           = req.body.blog;
			userDoc.company        = req.body.company;
			userDoc.email          = req.body.email;
			userDoc.name           = req.body.name;
			userDoc.reposArray     = req.body.reposArray;
			userDoc.followersArray = req.body.followersArray;
			userDoc.save((err) => {	
				if(err) { res.send({ error: 'Sorry something went wrong' });}
				else{
					userDoc.gitToken = null;
					res.send(userDoc);
				}
			});
		});
	});

	app.get("/api/users/:login", (req,res)=>{ 
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
		if(Object.keys(req.query).length === 1) {
			var key = Object.keys(req.query)[0];
			var value = req.query[key];
			var regex = new RegExp(["^", value, "$"].join(""), "i");
			req.query[key] = regex;
		}
		User.find( req.query , projection ,(err,users)=>{
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