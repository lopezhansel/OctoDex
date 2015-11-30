'use strict';

app.controller('indexController', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService", function ($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {

	var index = this;
	index.gamService = gamService;
	index.hello = "Hello World";

	// $interval(() => {
	// 	index.gamService = gamService;
	// 	console.log(index.gamService.me);
	// }, 5000);
}]);