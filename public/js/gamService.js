'use strict';

app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	var gam = this;

	$http.get('/api/me').then(function (response) {
		gam.me = response.data;
	});

	gam.sendData = function () {
		$http.put('/api/me', gam.me).then(function (response) {
			console.log(response.data);
		});
	};
}]);