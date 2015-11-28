module.exports = (app, passport) => {


	app.get('/', (req, res) => {
		res.sendFile('index.html', {
			root: './public'
		});
	});

	app.get('/auth/github', passport.authenticate('github', {scope: ['user:email'] }),
		function(req, res) {

	});

	app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}),
		function(req, res) {
			res.redirect('/');
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}



};