app.controller('otherProfileController', 
	[  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",
	function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {

	var gLogin = $routeParams.user; // just an alias
	$scope.gLogin = $routeParams.user;
	octoService.getOtherUsers(gLogin); // Fetch profile

	// interval to check if getOtherUsers ajax request came back
	var updateUserInterval = $interval( () => {
		var cacheUser = octoService.cachedUsers[gLogin];
		// if cacheUser exist with a .login or .message propertie
		if (cacheUser && (cacheUser.login  ||  cacheUser.message) ) {
			// then update $scope.user;
			$scope.user = cacheUser;
			$interval.cancel(updateUserInterval);
		}
	}, 20);

 
}]);

