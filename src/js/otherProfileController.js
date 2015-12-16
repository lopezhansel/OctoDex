app.controller('otherProfileController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {
	console.log("otherProfileController");
	// gamService[$routeParams.user] = null;
	gamService.getOtherUser($routeParams.user);
	// $scope.user = gamService[$routeParams.user];

	var updateUser = $interval( () => {
		console.log("inside interval");
		$scope.user = gamService[$routeParams.user];
		console.log( gamService[$routeParams.user]);
		if (($scope.user && $scope.user.login === $routeParams.user) || (gamService[$routeParams.user] && gamService[$routeParams.user].message) ) {
			console.log("canceling interval");
			console.log( gamService[$routeParams.user]);

			$interval.cancel(updateUser);
		}
	}, 5);


}]);