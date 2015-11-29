module.exports = (app, passport, User) => {


	app.get('/', (req, res) => {
		res.sendFile('index.html', {root: './public/views'});
	});

	app.get('/home', ensureAuthenticated, (req, res) => {
		res.send('Welcome Home');
	});

	app.get('/auth/github', passport.authenticate('github', {scope: ['user:email'] }), (req, res) => {

	});

	app.get('/api/me', ensureAuthenticated,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send("err");}
			user.gitToken = null;
			res.send(user);
		});
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
		if (req.isAuthenticated()) {return next(); }
		res.redirect('/');
	}


};