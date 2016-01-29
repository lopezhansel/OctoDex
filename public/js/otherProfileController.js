'use strict';

app.controller('otherProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {
	// octoService[$routeParams.user] = null;
	var githubUsername = $routeParams.user;
	octoService.getOtherUsers();
	// $scope.user = octoService[githubUsername];
	$scope.atHome = $location.path() === "/" ? true : false;
	$scope.toggleFullProfileSwitch = function () {
		$scope.fullProfileSwitch = !$scope.fullProfileSwitch;
	};
	$scope.fullProfileSwitch = false;

	var updateUserInterval = $interval(function () {
		$scope.user = octoService.cachedUsers[githubUsername];
		console.log(octoService.cachedUsers[githubUsername]);
		if ($scope.user && $scope.user.login === githubUsername || octoService.cachedUsers[githubUsername] && octoService.cachedUsers[githubUsername].message) {

			$interval.cancel(updateUserInterval);
		}
	}, 5);
}]);