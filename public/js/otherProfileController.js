'use strict';

app.controller('otherProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {

	var ghUser = $routeParams.user; // just an alias
	octoService.getOtherUsers(ghUser); // Fetch profile
	$scope.atHome = $location.path() === "/" ? true : false;
	$scope.fullProfileSwitch = false;
	$scope.toggleFullProfileSwitch = function () {
		$scope.fullProfileSwitch = !$scope.fullProfileSwitch;
	};

	// interval to check if getOtherUsers ajax request came back
	var updateUserInterval = $interval(function () {
		var cacheUser = octoService.cachedUsers[ghUser];
		// if cacheUser exist with a .login or .message propertie
		if (cacheUser && (cacheUser.login || cacheUser.message)) {
			// then update $scope.user;
			$scope.user = cacheUser;
			$interval.cancel(updateUserInterval);
		}
	}, 20);
}]);