'use strict';

app.service('octoService', ['$routeParams', '$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	// initializing
	var service = this; // just an alias
	service.signInBtn = "Sign In"; // text of the sign in button
	service.getSignInBtn = function () {
		return service.signInBtn;
	};
	service.showSaveBtn = false; // orange "Update Profile" Button
	service.cachedUsers = {}; // initializing other Users
	service.inlineElem = []; // array of inline elements that are dirty
	service.organizations = {};
	// function to update each element's css properties and values
	service.foreachElement = function (array, value, prop) {
		prop = prop || "color";
		array.forEach(function (el) {
			el.css(prop, value);
		});
	};

	// $resource Creates is a class with ajax methods
	var OctoApi = $resource('/api/users/:login', { login: '@login' }, {
		getMe: { method: 'GET', url: "api/me" },
		update: { method: 'POST', url: "api/me" },
		search: { method: 'GET', url: "api/users", isArray: true },
		check: { method: 'GET', url: "api/users/:userParam", params: { userParam: "@login" }, isArray: true },
		gitUser: { method: 'GET', url: "https://api.github.com/users/:userParam", params: { userParam: "@login" } },
		gitRepos: { method: 'GET', url: "https://api.github.com/users/:userParam/repos", params: { userParam: "@login" }, isArray: true },
		gitFollowers: { method: 'GET', url: "https://api.github.com/users/:userParam/followers", params: { userParam: "@login" }, isArray: true },
		gitFollowing: { method: 'GET', url: "https://api.github.com/users/:userParam/following", params: { userParam: "@login" }, isArray: true },
		searchGit: { method: 'GET', url: "https://api.github.com/search/users", params: { userParam: "@login" } }
	});

	// Get 20 Users Skip 1
	OctoApi.search({ limit: 20, skip: 1 }, function (data) {
		data.forEach(function (el) {
			service.cachedUsers[el.login] = el;
		});
	});

	service.getOrganizations = function (str) {
		OctoApi.search({ organizations: str }, function (data) {
			var org = str;
			service.organizations[org] = {};
			data.forEach(function (el) {
				service.organizations[org][el.login] = el;
			});
		});
	};
	service.getOrganizations("RefactorU");

	// Check if Client is Logged in using GET . service.client is an instance of OctoApi
	service.client = OctoApi.getMe(function () {
		// service.client.error = "not logged in" || service.client.login
		service.client.isLoggedIn = service.client.error ? false : true; // If not loggedIn then service.client.error = "not logged in"
		service.signInBtn = service.client.isLoggedIn ? "Sign out" : "Sign In";
		// If client is logged and doesn't have repos||followers then fetch github
		// BUG : followers and repos wont get updated ever
		if (service.client.error) {
			return;
		}
		service.client.repoUpdate = service.client.reposArray.length !== service.client.public_repos;
		service.client.followerUpdate = service.client.followersArray.length !== service.client.followers;
		if (service.client.followerUpdate || service.client.repoUpdate) {
			service.getFollowersAndRepos(service.client);
		}
	});

	service.getClient = function () {
		return service.client;
	};

	// POST method.  Reminder: service.client is an instance of OctoApi
	service.updateClient = function (form) {
		service.foreachElement(service.inlineElem, "#79E1FF"); // change to blue while POSTing
		if ($location.path() !== "/" && $location.path() !== "/account") {
			return;
		} // only update if at home or account page uri
		service.client.$update(function (response) {
			// Post Method . Sends service.client
			service.client.isLoggedIn = service.client.error ? false : true; //
			if (response.error) {
				// incase of failure. Like if there a duplicate
				service.foreachElement(service.inlineElem, "#FF3838"); // change color to red if erro
				alert("Sorry Something went wrong. Please Try again in a few minutes.");
			} else {
				form.$setPristine();
				service.showSaveBtn = false; // orange "Update Profile" Button
				service.foreachElement(service.inlineElem, "#333333"); // change back to black if success
			}
		});
	};

	// add repos and followers properties to the UserObj since the regular api doesn't give them by default
	// BUG : Too much data is being Sent to server and saved. REPOS are heavy and duplicated info
	service.getFollowersAndRepos = function (userObj) {
		userObj.reposArray = OctoApi.gitRepos({ userParam: userObj.login }, function (data) {
			userObj.followersArray = OctoApi.gitFollowers({ userParam: userObj.login }, function (data) {
				userObj.followingArray = OctoApi.gitFollowing({ userParam: userObj.login }, function (data) {
					userObj.$save({ login: userObj.login }, function (returnData) {});
				});
			});
		});
	};

	// getOtherUsers is for retrieving another users that are not the client profile
	service.getOtherUsers = function (userInput) {
		var ghUser = userInput || $routeParams.user; // ghUser is the gitHub login name
		var cacheAlias = service.cachedUsers; // give cachedUsers an alias
		// if user is already cached then exit
		if (cacheAlias[ghUser]) {
			return;
		}
		OctoApi.check({ userParam: ghUser }, function (data, responseHeaders) {
			if (data.length) {
				// If user Exist.
				cacheAlias[ghUser] = data[0];
			} else {
				cacheAlias[ghUser] = OctoApi.gitUser({ userParam: ghUser }, function (data, responseHeaders) {
					service.getFollowersAndRepos(cacheAlias[ghUser]);
				});
			}
		});
	};
	return service;
}]);