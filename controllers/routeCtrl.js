module.exports = (app, passport) => {


	app.get('/', (req, res) => {
		res.sendFile('index.html', {
			root: './public/views'
		});
	});

	app.get('/home',ensureAuthenticated, function (req,res) {
		res.send('Welcome Home');
	});

	app.get('/auth/github', passport.authenticate('github', {scope: ['user:email'] }), function (req,res) {
	});

	app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), function(req, res) {
		req.logIn(req.user, function(err) {
            if (err) {
                return next(err);
            }
            return  res.redirect('/home');
        });

	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	}



};