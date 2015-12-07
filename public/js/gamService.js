'use strict';

app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	var gam = this;

	$http.get('/api/me').then(function (response) {
		gam.me = response.data;
		gam.me.mainList = ["blog", "company", "email", "hireable", "location"];
		$http.get('https://api.github.com/users/' + gam.me.username + '/followers').then(function (response) {
			gam.me.followers = response.data;
		});
		$http.get('https://api.github.com/users/' + gam.me.username + '/repos').then(function (response) {
			gam.me.repos = response.data;
		});
	});

	gam.sendData = function () {
		$http.put('/api/me', gam.me).then(function (response) {
			console.log(response.data);
		});
	};
}]);