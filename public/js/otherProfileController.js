'use strict';

app.controller('otherProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {

	gamService.getOtherUser($routeParams.user);
	$timeout(function () {
		$scope.user = gamService.otherUser;
		console.log(gamService.otherUser);
	}, 500);
}]);