var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res) {
	res.sendFile('html/index.html', {
		root: './public'
	});
});



var port = 80;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});



passport.use(new GitHubStrategy({
		callbackURL: "http://127.0.0.1/auth/github/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({
			githubId: profile.id
		}, function(err, user) {
			console.log(user);
			return done(err, user);
		});
	}
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
