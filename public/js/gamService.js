'use strict';

app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

	var gam = this;

	$http.get('/api/me').then(function (response) {
		gam.me = response.data;
	});
}]);