'use strict';

app.service('octoService', ['$window', '$q', '$document', '$routeParams', '$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($window, $q, $document, $routeParams, $resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	// initializing
	var svc = this;
	svc.signInBtn = "Sign In"; // text of the sign in button
	svc.showSaveBtn = false; // orange "Update Profile" Button
	svc.cachedUsers = {}; // initializing other Users
	svc.inlineElem = []; // array of inline elements that are dirty
	svc.organizations = {};
	svc.getSignInBtn = function () {
		return svc.signInBtn;
	};
	svc.downloadVcard = function (filename, text) {
		var elem = document.createElement('a');
		elem.setAttribute('href', 'data:text/vcard;charset=utf-8,' + encodeURIComponent(text));
		elem.setAttribute('download', filename);
		elem.style.display = 'none';
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	};
	// function to update each element's css properties and values
	svc.foreachElement = function (array, value, prop) {
		prop = prop || "color";
		array.forEach(function (el) {
			el.css(prop, value);
		});
	};

	// $resource Creates is a class with ajax methods
	var OctoApi = $resource('/api/users/:login', { login: '@login' }, {
		getClient: { method: 'GET', url: "api/me" },
		updateClient: { method: 'POST', url: "api/me" },
		search: { method: 'GET', url: "api/users", isArray: true },
		check: { method: 'GET', url: "api/users/:userParam", params: { userParam: "@login" }, isArray: true },
		searchGit: { method: 'GET', url: "https://api.github.com/search/users", params: { userParam: "@login" } }
	});
	OctoApi.prototype.gitUser = function (gLogin) {
		var login = this.login || gLogin;
		return $http.get("https://api.github.com/users/" + gLogin).then(function (res) {
			return res.data;
		}, function (err) {
			alert("Sorry Couldn't get User" + err.statusText);
		});
	};
	OctoApi.prototype.gitReposFollowers = function (user) {
		var that = user || this;
		// Check Etag before going to github
		return $q.all([$http.get("https://api.github.com/users/" + that.login + "/repos"), $http.get("https://api.github.com/users/" + that.login + "/following"), $http.get("https://api.github.com/users/" + that.login + "/followers")]).then(function (results) {
			that.reposArray = results[0].data;
			that.followingArray = results[1].data;
			that.followersArray = results[2].data;
			return that;
		}, function (err) {
			alert("Sorry " + err.data.message);
		});
	};
	OctoApi.prototype.getCard = function (user) {
		user = user || this;
		$http.post('/getCard', user).then(function (response) {
			svc.downloadVcard(user.login + ".vcf", response.data);
		}, function (ifErr) {
			alert("Sorry. Error Downloading Contact File \n " + ifErr.data);
		});
	};

	// Get 20 Users Skip 1
	OctoApi.search({ limit: 20, skip: 1 }, function (data) {
		data.forEach(function (el) {
			svc.cachedUsers[el.login] = el;
		});
	});

	svc.getOrganizations = function (orgStr) {
		OctoApi.search({ organizations: orgStr }, function (data) {
			if (!data.length) {
				OctoApi.prototype.gitOrg(orgStr);
			}
			svc.organizations[orgStr] = {};
			data.forEach(function (el) {
				svc.organizations[orgStr][el.login] = el;
			});
		});
	};
	OctoApi.prototype.gitOrg = function (str) {
		$http.get("https://api.github.com/orgs/" + str + "/members").then(function (res) {
			svc.organizations[str] = {};
			res.data.forEach(function (el) {
				console.log(el.login);
				svc.organizations[str][el.login] = el;
			});
		});
	};
	svc.getOrganizations("RefactorU");

	// Check if Client is Logged in using GET . svc.client is an instance of OctoApi
	svc.client = OctoApi.getClient(function () {
		// svc.client.error = "not logged in" || svc.client.login
		svc.client.isLoggedIn = svc.client.error ? false : true; // If not loggedIn then svc.client.error = "not logged in"
		svc.signInBtn = svc.client.isLoggedIn ? "Sign out" : "Sign In";
		// If client is logged and doesn't have repos||followers then fetch github
		// BUG : followers and repos wont get updated ever
		if (svc.client.error) {
			return;
		}
		svc.client.repoUpdate = svc.client.reposArray.length !== svc.client.public_repos;
		svc.client.followerUpdate = svc.client.followersArray.length !== svc.client.followers;
		if (svc.client.followerUpdate || svc.client.repoUpdate) {
			svc.client.gitReposFollowers();
		}
	});

	svc.clientGetter = function () {
		return svc.client;
	};

	// POST method.  Reminder: svc.client is an instance of OctoApi
	svc.updateClient = function () {
		svc.foreachElement(svc.inlineElem, "#79E1FF"); // change to blue while POSTing
		if ($location.path() !== "/" && $location.path() !== "/account") {
			return;
		} // only update if at home or account page uri

		svc.client.$updateClient(function (response) {
			// Post Method . Sends svc.client
			svc.client.isLoggedIn = svc.client.error ? false : true; //
			if (response.error) {
				// incase of failure. Like if there a duplicate
				svc.foreachElement(svc.inlineElem, "#FF3838"); // change color to red if erro
				alert("Sorry Something went wrong. Please Try again in a few minutes.");
			} else {
				svc.showSaveBtn = false; // orange "Update Profile" Button
				svc.foreachElement(svc.inlineElem, "#333333"); // change back to black if success
			}
		});
	};

	// getOtherUsers is for retrieving another users that are not the client profile
	svc.getOtherUsers = function (userInput) {
		var gLogin = userInput || $routeParams.user; // gLogin is the gitHub login name
		var cacheAlias = svc.cachedUsers; // give cachedUsers an alias
		// if user is already cached then exit
		if (cacheAlias[gLogin]) {
			if (cacheAlias[gLogin].reposArray === null || cacheAlias[gLogin].followersArray === null) {
				// Temporary fix for mongo performance. Retrieving RefactorU Student data used to be really heavy.
				cacheAlias[gLogin].gitReposFollowers();
			}
			return;
		}
		OctoApi.check({ userParam: gLogin }, function (data, responseHeaders) {
			if (data.length) {
				// If user Exist.
				cacheAlias[gLogin] = data[0];
			} else {
				cacheAlias[gLogin] = new OctoApi();
				cacheAlias[gLogin].gitUser(gLogin).then(cacheAlias[gLogin].gitReposFollowers).then(function (data) {
					_.assignIn(cacheAlias[gLogin], data);
					console.log(cacheAlias[gLogin]);
				});
			}
		});
	};
	return svc;
}]);