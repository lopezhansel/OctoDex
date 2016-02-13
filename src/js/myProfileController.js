app.controller('myProfileController', 
	[  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",
	function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {

	
	// interval to check if update ajax request came back
	var updateUserInterval = $interval( () => {
		var me = octoService.client;
		// if me exist with a .githubId or .error  properties
		if (me && (me.githubId  ||  me.error)) {
			// then set $scope.user;
			$scope.user = me;
			$interval.cancel(updateUserInterval);
		}
	}, 20);



}]);
