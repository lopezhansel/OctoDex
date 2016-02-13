"use strict";

app.controller('indexController', ["$scope", "$mdSidenav", "$window", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService", function ($scope, $mdSidenav, $window, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {
	$scope.$mdMedia = $mdMedia;

	$scope.octoService = octoService;
	$scope.od = octoService;
	$scope.client = octoService.getClient();
	$scope.toggleLink = function () {
		$scope.linkBool = $scope.linkBool ? false : true;
	};

	$scope.link = "http://lopezhansel.com:2000/#/profile/";

	$scope.logger = function () {
		if (octoService.client.error) {
			$window.open("/auth/github", "_self");
		} else {
			$window.open("/logout", "_self");
		}
	};

	$scope.isAtHome = function () {
		return $location.$$path !== '/';
	};
	$scope.redirect = function (str) {
		$location.path(str);
	};
	$scope.toggleSidenav = function (menuId) {
		$mdSidenav(menuId).toggle();
	};
}]);