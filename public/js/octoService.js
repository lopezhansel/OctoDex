'use strict';

app.service('octoService', ['$routeParams', '$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	// initializing
	var service = this; // just an alias
	service.signInBtn = "Sign In"; // text of the sign in button
	var secret = ' '; //  ?client_id=xxxx&client_secret=yyyy' I use Only When developing
	service.showSaveBtn = false; // orange "Update Profile" Button
	var ApiMe = $resource('/api/me', {}, {}); // Creates a class with GET POST etc methods
	service.cachedUsers = {}; // initializing other Users

	// Check if Client is Logged in using GET . service.client is an instance of ApiMe
	service.client = ApiMe.get(function () {
		// service.client.error = "not logged in" || service.client.username
		service.client.isLoggedIn = service.client.error ? false : true; // If not loggedIn thhen service.client.error = "not logged in"
		service.signInBtn = service.client.isLoggedIn ? "Sign out" : "Sign In";
		// If client is logged and doesn't have repos||follower then fetch github
		// BUG : followers and repos wont get updated ever
		if (service.client.isLoggedIn && (!service.client.repos.length || !service.client.followers.length)) {
			service.getFollowersAndRepos(service.client);
		}
	});

	// POST method.  Reminder: service.client is an instance of ApiMe
	service.updateClient = function () {
		if ($location.path() !== "/") {
			return;
		} // only update if at home uri
		service.client.$save(function (response) {
			// Post Method . Sends service.client
			service.client.isLoggedIn = service.client.error ? false : true; //
			if (response.error) {
				// incase of failure. Like if there a duplicate
				alert("Sorry Something went wrong. Please Try again in a few minutes.");
			} else {
				service.showSaveBtn = false; // orange "Update Profile" Button
			}
		});
	};

	// add repo and follower properties to the UserObj since the regular api doesn't give them by default
	// BUG : service.updateClient(); is being called by getOtherUsers
	// BUG : Too much data is being stored into server
	service.getFollowersAndRepos = function (userObj) {
		$http.get('https://api.github.com/users/' + userObj.username + '/followers' + secret).then(function (response) {
			userObj.followers = response.data;
			service.updateClient(); // Post Method . Sends service.client
		});
		$http.get('https://api.github.com/users/' + userObj.username + '/repos' + secret).then(function (response) {
			userObj.repos = response.data;
			service.updateClient(); // Post Method . Sends service.client
		});
	};

	// getOtherUsers is for retrieving another users that are not the client profile
	service.getOtherUsers = function () {
		var username = $routeParams.user; // userName is the gitHub username
		// if username exist in cachedUsers exit
		if (service.cachedUsers[username]) {
			return;
		}
		// if username doesn't exist in cachedUsers then retrieve 
		$http.get('https://api.github.com/users/' + username + secret).then(function (response) {
			service.cachedUsers[username] = response.data;
			service.cachedUsers[username].username = service.cachedUsers[username].login;
			service.getFollowersAndRepos(service.cachedUsers[username]);
		}, function (responseErr) {
			// this function will run in case of an error
			var username = $routeParams.user;
			service.cachedUsers[username] = responseErr.data;
		});
	};
}]);