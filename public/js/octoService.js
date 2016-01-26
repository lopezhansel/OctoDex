'use strict';

app.service('octo', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {
	//  give this the alias of octo
	var octo = this;
	// text of the sign in button
	octo.signInBtn = "Sign In";
	var secret = ' ';
	octo.showSaveBtn = false;

	// First action to do is check if user is logged in.
	$http.get('/api/me').then(function (response) {
		// console.log('/api/me', response.data);
		// octo.me object will contain have new properties if logged in
		octo.me = response.data;
		// if client is not logged in octo.me will have a error property
		if (octo.me.error) {
			return;
		}
		// if logged in, will trigger the following two functions to retrieve more data about the github user
		octo.getFollowers(octo.me);
		octo.getRepos(octo.me);
		// if logged in the string signInBtn will change
		octo.signInBtn = "Sign out";
	});

	octo.getFollowers = function (user) {
		// the 'user' parameter contains information about the client that the server sent to us
		$http.get('https://api.github.com/users/' + user.username + '/followers' + secret).then(function (response) {
			user.followers = response.data;
			// console.log(user.followers);
		});
	};

	octo.getRepos = function (user) {
		// the 'user' parameter contains information about the client that the server sent to us
		$http.get('https://api.github.com/users/' + user.username + '/repos' + secret).then(function (response) {
			user.repos = response.data;
			// console.log(user.repos);
		});
	};
	octo.otherUsers = {};

	// getAnotherUser is for retrieving another user that is not the client profile
	octo.getAnotherUser = function (user) {
		$http.get('https://api.github.com/users/' + user + secret).then(function (response) {
			octo.otherUsers[$routeParams.user] = response.data;
			octo.otherUsers[$routeParams.user].username = octo.otherUsers[$routeParams.user].login;
			octo.getFollowers(octo.otherUsers[$routeParams.user]);
			octo.getRepos(octo.otherUsers[$routeParams.user]);
		}, function (response) {
			octo.otherUsers[$routeParams.user] = response.data;
		});
	};

	octo.updateUser = function () {
		var tempfollowers = octo.me.followers;
		var tempRepos = octo.me.repos;
		octo.me.followers = null;
		octo.me.repos = null;
		$http.put('/api/me', octo.me).then(function (response) {
			octo.me.followers = tempfollowers;
			octo.me.repos = tempRepos;
			if (response.data === "err") {
				alert("Sorry Something went wrong. Please Try again in a few minutes.");
			} else {
				octo.showSaveBtn = false;
			}
		});
	};
}]);