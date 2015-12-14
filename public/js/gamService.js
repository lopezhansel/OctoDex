'use strict';

app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	var gam = this;
	gam.signInBtn = "Sign In";

	$http.get('/api/me').then(function (response) {
		gam.me = response.data;
		if (gam.me.error) {
			return;
		}
		gam.me.mainList = ["blog", "company", "email", "hireable", "location"];
		gam.getFollowers(gam.me);
		gam.getRepos(gam.me);
		gam.signInBtn = "Sign out";
	});

	gam.getFollowers = function (user) {
		$http.get('https://api.github.com/users/' + user.username + '/followers').then(function (response) {
			user.followers = response.data;
			console.log(user.followers);
		});
	};

	gam.getOtherUser = function (user) {
		$http.get('https://api.github.com/users/' + user).then(function (response) {
			gam.otherUser = response.data;
			gam.otherUser.username = gam.otherUser.login;
			gam.otherUser.mainList = ["blog", "company", "email", "hireable", "location"];
			gam.getFollowers(gam.otherUser);
			gam.getRepos(gam.otherUser);
		}, function (response) {
			gam.otherUser = response.data;
		});
	};

	gam.getRepos = function (user) {
		$http.get('https://api.github.com/users/' + user.username + '/repos').then(function (response) {
			user.repos = response.data;
			console.log(user.repos);
		});
	};

	gam.sendData = function () {
		$http.put('/api/me', gam.me).then(function (response) {
			// console.log(response.data);
		});
	};
}]);