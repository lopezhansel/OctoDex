'use strict';

app.service('octoService', ['$window', '$q', '$document', '$routeParams', '$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($window, $q, $document, $routeParams, $resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {
	var _this2 = this;

	var signInBtnTxt = "Sign In",
	    showSaveBtn = false,
	    cachedUsers = {},
	    dirtyInlineElem = [],
	    organizations = {};

	// $resource Creates is a class with ajax methods
	var OctoApi = $resource('/api/users/:login', { login: '@login' }, {
		getClient: { method: 'GET', url: "api/me" },
		updateClient: { method: 'POST', url: "api/me" },
		search: { method: 'GET', url: "api/users", isArray: true },
		check: { method: 'GET', url: "api/users/:userParam", params: { userParam: "@login" }, isArray: true },
		searchGit: { method: 'GET', url: "https://api.github.com/search/users", params: { userParam: "@login" } }
	});
	OctoApi.prototype.gitUser = function () {
		var _this = this;

		return $http.get("https://api.github.com/users/" + this.login).then(function (res) {
			return _.assignIn(_this, res.data);
		}, ifErrFn);
	};

	OctoApi.prototype.gitReposFollowers = function (userObj) {
		var user = userObj || _this2;
		// Check Etag before going to github
		return $q.all([$http.get('https://api.github.com/users/' + user.login + '/repos'), $http.get('https://api.github.com/users/' + user.login + '/following'), $http.get('https://api.github.com/users/' + user.login + '/followers')]).then(function (results) {
			user.reposArray = results[0].data;
			user.followingArray = results[1].data;
			user.followersArray = results[2].data;
			return user;
		}, ifErrFn);
	};
	OctoApi.prototype.getCard = function () {
		$http.post('/getCard', _this2).then(function (response) {
			downloadVcard(_this2.login + ".vcf", response.data);
		}, ifErrFn);
	};

	// Get 20 Users Skip 1
	OctoApi.search({ limit: 20, skip: 1 }, function (data) {
		data.forEach(function (el) {
			return cachedUsers[el.login] = el;
		});
	});

	var getOrganizations = function getOrganizations(orgStr) {
		OctoApi.search({ organizations: orgStr }, function (data) {
			if (!data.length) {
				OctoApi.prototype.gitOrg(orgStr);
			}
			organizations[orgStr] = {};
			data.forEach(function (el) {
				organizations[orgStr][el.login] = el;
			});
		});
	};
	getOrganizations("RefactorU");

	OctoApi.prototype.gitOrg = function (orgStr) {
		$http.get('https://api.github.com/orgs/' + orgStr + '/members').then(function (res) {
			organizations[orgStr] = {};
			res.data.forEach(function (el) {
				organizations[orgStr][el.login] = el;
			});
		});
	};

	// Check if Client is Logged in using GET . client is an instance of OctoApi
	var client = OctoApi.getClient(function () {
		// client.error = "not logged in" || client.login
		client.isLoggedIn = client.error ? false : true; // If not loggedIn then client.error = "not logged in"
		signInBtnTxt = client.isLoggedIn ? "Sign out" : "Sign In";
		// If client is logged and doesn't have repos||followers then fetch github
		// BUG : followers and repos wont get updated ever
		if (client.error) {
			return;
		}
		client.repoUpdate = client.reposArray.length !== client.public_repos;
		client.followerUpdate = client.followersArray.length !== client.followers;
		if (client.followerUpdate || client.repoUpdate) {
			client.gitReposFollowers();
		}
	});
	var clientGetter = function clientGetter() {
		return client;
	};

	// POST method.  Reminder: client is an instance of OctoApi
	var updateClient = function updateClient() {
		foreachElement(dirtyInlineElem, "#79E1FF"); // change to blue while POSTing
		if ($location.path() !== "/" && $location.path() !== "/account") {
			return;
		} // only update if at home or account page uri

		client.$updateClient(function (response) {
			// Post Method . Sends client
			client.isLoggedIn = client.error ? false : true; //
			if (response.error) {
				// incase of failure. Like if there a duplicate
				foreachElement(dirtyInlineElem, "#FF3838"); // change color to red if erro
				alert("Sorry Something went wrong. Please Try again in a few minutes.");
			} else {
				showSaveBtn = false; // orange "Update Profile" Button
				foreachElement(dirtyInlineElem, "#333333"); // change back to black if success
			}
		});
	};

	// getOtherUsers is for retrieving another users that are not the client profile
	var getOtherUsers = function getOtherUsers(userObj) {
		var login = userObj || $routeParams.user; // login is the gitHub login name
		// if user is already cached then exit
		if (cachedUsers[login]) {
			if (cachedUsers[login].reposArray === null || cachedUsers[login].followersArray === null) {
				// Temporary fix for mongo performance. Retrieving RefactorU Student data used to be really heavy.
				cachedUsers[login].gitReposFollowers();
			}
			return;
		}
		OctoApi.check({ userParam: login }, function (userArr, responseHeaders) {
			if (userArr.length) {
				// If user Exist.
				cachedUsers[login] = userArr[0];
			} else {
				cachedUsers[login] = new OctoApi({ login: login });
				cachedUsers[login].gitUser().then(cachedUsers[login].gitReposFollowers);
			}
		});
	};

	var service = this;
	service = { signInBtnTxt: signInBtnTxt, cachedUsers: cachedUsers, dirtyInlineElem: dirtyInlineElem, organizations: organizations, getProp: getProp, downloadVcard: downloadVcard, foreachElement: foreachElement, getOrganizations: getOrganizations, client: client, clientGetter: clientGetter, updateClient: updateClient, showSaveBtn: showSaveBtn, getOtherUsers: getOtherUsers };
	return service;

	function ifErrFn(errObj) {
		var statusText = errObj.statusText ? errObj.statusText : " Error";
		alert('Sorry something went wrong: ' + statusText);
		console.log(data);
	}
	function getProp(prop, obj) {
		return obj ? obj[prop] : this[prop];
	}

	function downloadVcard(filename, text) {
		var elem = document.createElement('a');
		elem.setAttribute('href', 'data:text/vcard;charset=utf-8,' + encodeURIComponent(text));
		elem.setAttribute('download', filename);
		elem.style.display = 'none';
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
	// function to update each element's css properties and values
	function foreachElement(array, value, prop) {
		prop = prop || "color";
		array.forEach(function (el) {
			el.css(prop, value);
		});
	}
}]);