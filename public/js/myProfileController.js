'use strict';

app.controller('myProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octo", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octo) {
	$scope.atHome = $location.path() === "/" ? true : false;
	$scope.octo = octo;
	$scope.user = octo.client;
	$scope.toggleFullProfileSwitch = function () {
		$scope.fullProfileSwitch = !$scope.fullProfileSwitch;
	};
	$scope.fullProfileSwitch = false;
	$timeout(function () {
		$scope.octo = octo;
		if (!$scope.octo.client) {}
	}, 1000);

	$scope.updateUser = octo.updateUser;
}]);