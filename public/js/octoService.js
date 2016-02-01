'use strict';

app.service('octoService', ['$routeParams', '$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	// initializing
	var service = this; // just an alias
	service.signInBtn = "Sign In"; // text of the sign in button
	service.showSaveBtn = false; // orange "Update Profile" Button
	service.cachedUsers = {}; // initializing other Users
	service.inlineElem = []; // array of inline elements that are dirty
	// function to update each element's css properties and values
	service.foreachElement = function (array, value, prop) {
		prop = prop || "color";
		array.forEach(function (el) {
			el.css(prop, value);
		});
	};

	// $resource Creates is a class with ajax methods
	var OctoApi = $resource('/api/me/:user', { user: '@user' }, {
		update: { method: 'POST', url: "api/me" },
		search: { method: 'GET', url: "api/users", isArray: true },
		gitUser: { method: 'GET', url: "https://api.github.com/users/:userParam", params: { userParam: "@login" } },
		gitRepos: { method: 'GET', url: "https://api.github.com/users/:userParam/repos", params: { userParam: "@login" }, isArray: true },
		gitFollowers: { method: 'GET', url: "https://api.github.com/users/:userParam/followers", params: { userParam: "@login" }, isArray: true }
	});

	// Check if Client is Logged in using GET . service.client is an instance of OctoApi
	service.client = OctoApi.get({}, { params: "me" }, function () {
		// service.client.error = "not logged in" || service.client.username
		service.client.isLoggedIn = service.client.error ? false : true; // If not loggedIn then service.client.error = "not logged in"
		service.signInBtn = service.client.isLoggedIn ? "Sign out" : "Sign In";
		// If client is logged and doesn't have repos||followers then fetch github
		// BUG : followers and repos wont get updated ever
		service.client.repoUpdate = service.client.reposArray.length !== service.client.public_repos;
		service.client.followerUpdate = service.client.followersArray.length !== service.client.followers;
		if (service.client.isLoggedIn && (service.client.followerUpdate || service.client.repoUpdate)) {
			service.getFollowersAndRepos(service.client);
		}
	});

	// POST method.  Reminder: service.client is an instance of OctoApi
	service.updateClient = function () {
		service.foreachElement(service.inlineElem, "#79E1FF"); // change to blue while POSTing
		if ($location.path() !== "/") {
			return;
		} // only update if at home uri
		service.client.$save(function (response) {
			// Post Method . Sends service.client
			service.client.isLoggedIn = service.client.error ? false : true; //
			if (response.error) {
				// incase of failure. Like if there a duplicate
				service.foreachElement(service.inlineElem, "#FF3838"); // change color to red if erro
				alert("Sorry Something went wrong. Please Try again in a few minutes.");
			} else {
				service.showSaveBtn = false; // orange "Update Profile" Button
				service.foreachElement(service.inlineElem, "#333333"); // change back to black if success
			}
		});
	};

	// add repos and followers properties to the UserObj since the regular api doesn't give them by default
	// BUG : service.updateClient(); is being called by getOtherUsers
	// BUG : Too much data is being stored into server
	service.getFollowersAndRepos = function (userObj) {
		userObj.reposArray = OctoApi.gitRepos({ userParam: userObj.username }, service.updateClient);
		userObj.followersArray = OctoApi.gitFollowers({ userParam: userObj.username }, service.updateClient);
	};

	// getOtherUsers is for retrieving another users that are not the client profile
	service.getOtherUsers = function (userInput) {
		var ghUser = userInput || $routeParams.user; // ghUser is the gitHub login name
		var cacheAlias = service.cachedUsers; // give cachedUsers an alias
		// if user is already cached then exit
		if (cacheAlias[ghUser]) {
			return;
		}
		// if user doesn't exist in cachedUsers then retrieve 
		cacheAlias[ghUser] = OctoApi.gitUser({ userParam: ghUser }, function (data, responseHeaders) {
			var login = cacheAlias[ghUser].login;
			cacheAlias[ghUser].username = login; // reassigning properties
			cacheAlias[ghUser].reposArray = OctoApi.gitRepos({ userParam: login });
			cacheAlias[ghUser].followersArray = OctoApi.gitFollowers({ userParam: login });
		});
	};
}]);