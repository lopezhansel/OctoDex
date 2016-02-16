var User = require("../models/userModel");
var multipart = require('connect-multiparty');
var retrnNDel =  (obj,str) => {
	var output = obj[str];
	delete obj[str];
	return output;
};
module.exports = (app, passport) => {
	app.use(multipart({
	    uploadDir: "./uploads"
	}));


	app.get('/', (req, res) => {
		res.sendFile('index.html', {root: './public/views'});
	});

	app.post('/upload/', function (req, res, next) {
		res.send({message:"ok"});
	});
	
	app.get('/api/me', ensureAuthenticatedAjax,  (req,res) => {
		User.findById(req.user._id, (err, user) => {
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			user.gitToken = null;
			res.send(user);
		});
	});

	app.post('/getCard', function (req, res, next) {
		var vCard = require('vcards-js');
	    vCard = vCard();
	    vCard.firstName = req.body.name;
	    vCard.organization = req.body.organizations;
	    vCard.photo.attachFromUrl(req.body.avatar_url, 'JPEG');
	    vCard.workPhone = req.body.phone;
	    vCard.title = req.body.jobTitle;
	    vCard.url = req.body.blog;
	    vCard.note = req.body.bio;
	    vCard.nickname = req.body.login;
	    vCard.email = req.body.email;
	    vCard.homeAddress.city = req.body.location;
	    vCard.socialUrls['github'] = req.body.html_url;
	    vCard.socialUrls['facebook'] = req.body.facebookUrl;
	    vCard.socialUrls['linkedIn'] = req.body.linkedInUrl;
	    vCard.socialUrls['twitter'] = req.body.twitter;
	    // vCard.version = '4.0';
	    res.set('Content-Type', 'text/vcard; name="enesser.vcf"');
	    res.set('Content-Disposition', 'inline; filename="enesser.vcf"');
	    res.send(vCard.getFormattedString());
	});

	app.post('/api/me', ensureAuthenticatedAjax,  (req,res) => {
		User.findById(req.user._id, (err, me) => {
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			me.bio                 = req.body.bio;
			me.name                = req.body.name;
			me.company             = req.body.company;
			me.blog                = req.body.blog;
			me.location            = req.body.location;
			me.hireable            = req.body.hireable;
			me.public_repos        = req.body.public_repos;
			me.public_gists        = req.body.public_gists;
			me.following           = req.body.following;
			me.followers           = req.body.followers;
			me.created_at          = req.body.created_at;
			me.updated_at          = req.body.updated_at;
			me.reposArray          = req.body.reposArray;
			me.followersArray      = req.body.followersArray;
			me.followingArray      = req.body.followingArray;
			me.twitterHandle       = req.body.twitterHandle;
			me.facebookUrl         = req.body.facebookUrl;
			me.linkedInUrl         = req.body.linkedInUrl;
			me.phone               = req.body.phone;
			me.jobTitle            = req.body.jobTitle;
			me.xRatelimitReset     = req.body.xRatelimitReset;
			me.xRatelimitRemaining = req.body.xRatelimitRemaining;
			me.xRatelimitLimit     = req.body.xRatelimitLimit;
			me.lastModified        = req.body.lastModified;
			if(req.body.email) {me.email = req.body.email;}
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
		if(Object.keys(req.params).length === 1) {
			var key = Object.keys(req.params)[0];
			var value = req.params[key];
			var regex = new RegExp(["^", value, "$"].join(""), "i");
			req.params[key] = regex;
		}
		User.find(req.params,(err,users)=>{
			if (!users.length) {
				console.log(req.params,"not found");
				return;
			} 
			var userDoc = users[0];
			if(err) { res.send({ error: 'Search went wrong' });}
			userDoc.bio            = req.body.bio;
			userDoc.name           = req.body.name; // enable this
			userDoc.company        = req.body.company;
			userDoc.blog           = req.body.blog;
			userDoc.location       = req.body.location;
			userDoc.hireable       = req.body.hireable;
			userDoc.public_repos   = req.body.public_repos;
			userDoc.public_gists   = req.body.public_gists;
			userDoc.following      = req.body.following;
			userDoc.followers      = req.body.followers;
			userDoc.created_at     = req.body.created_at;
			userDoc.updated_at     = req.body.updated_at;
			userDoc.reposArray     = req.body.reposArray;
			userDoc.followersArray = req.body.followersArray;
			userDoc.followingArray = req.body.followingArray;
			userDoc.twitterHandle  = req.body.twitterHandle;
			userDoc.facebookUrl    = req.body.facebookUrl;
			userDoc.linkedInUrl    = req.body.linkedInUrl;
			userDoc.phone          = req.body.phone;
			userDoc.jobTitle       = req.body.jobTitle;

			// Email is required by schema thus will break if null
			if(req.body.email) {userDoc.email = req.body.email;}

			userDoc.save((err) => {	
				if(err) { 
					console.log("save",err);
					res.send({ error: 'Save went wrong' });
				}
				else{
					userDoc.gitToken = null;
					res.send(userDoc);
				}
			});
		});
	});

	app.get("/api/users/:login", (req,res)=>{ 

		User.find(req.params,(err,users)=>{
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			else{
				users.gitToken = null;
				res.send(users);
			}
		});
	});


	app.get("/api/users/", (req,res)=>{	
		var limit = retrnNDel(req.query,"limit");
		var projection = retrnNDel(req.query,"projection");
		var skip = retrnNDel(req.query,"skip");
		if(Object.keys(req.query).length === 1) {
			var key = Object.keys(req.query)[0];
			var value = req.query[key];
			var regex = new RegExp(["^", value, "$"].join(""), "i");
			req.query[key] = regex;
		}
		User.find( req.query , projection ,(err,users)=>{
			if(err) { res.send({ error: 'Sorry something went wrong' });}
			else{
				if(!projection){users.forEach( (e) => {
					e.gitToken = null;
					e.followingArray = null; // Temporary fix for mongo performance
					e.reposArray = null; // Temporary fix for mongo performance
					e.followersArray = null; // Temporary fix for mongo performance
				});}
				res.send(users);
			}
		}).skip(skip).limit(limit);
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