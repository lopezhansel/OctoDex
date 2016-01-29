'use strict';

app.service('octo', ['$routeParams', '$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	var octo = this; // just an alias for this
	octo.signInBtn = "Sign In"; // text of the sign in button
	var secret = ' ';
	octo.showSaveBtn = false;
	var apiME = $resource('/api/me', {}, {});

	// // First action to do is check if user is logged in.
	octo.me = apiME.get(function () {
		// octo.me.error = "not logged in" || octo.me.username
		octo.me.isLoggedIn = octo.me.error ? false : true;
		octo.signInBtn = octo.me.isLoggedIn ? "Sign out" : "Sign In";
		// if client is not logged in octo.me will have a error property
		if (octo.me.isLoggedIn) {
			// if logged in, will trigger the following two functions to retrieve more data about the github user
			if (!octo.me.repos.length || !octo.me.followers.length) {
				octo.getFollowers(octo.me);
				octo.getRepos(octo.me);
			}
		}
	});

	octo.getFollowers = function (user) {
		// the 'user' parameter contains information about the client that the server sent to us
		$http.get('https://api.github.com/users/' + user.username + '/followers' + secret).then(function (response) {
			user.followers = response.data;
			octo.updateUser();
		});
	};

	octo.getRepos = function (user) {
		// the 'user' parameter contains information about the client that the server sent to us
		$http.get('https://api.github.com/users/' + user.username + '/repos' + secret).then(function (response) {
			user.repos = response.data;
			octo.updateUser();
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
		octo.me.$save(function (response) {
			octo.me.isLoggedIn = octo.me.error ? false : true;
			if (response.error) {
				alert("Sorry Something went wrong. Please Try again in a few minutes.");
			} else {
				octo.showSaveBtn = false;
			}
		});
	};
}]);