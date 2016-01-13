'use strict';

app.controller('myProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octo", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octo) {

	$scope.octo = octo;
	$scope.user = octo.me;
	$scope.viewFullProfile = false;

	$timeout(function () {
		$scope.octo = octo;
		if (!$scope.octo.me) {}
	}, 1000);

	$scope.update = function () {
		// here it will update server
		console.log(octo.me);
	};
}]);