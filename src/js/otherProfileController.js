app.controller('otherProfileController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {

	gamService.getOtherUser($routeParams.user);

	var updateUser = $interval( () => {
		$scope.user = gamService.otherUser;
		if (($scope.user && $scope.user.login === $routeParams.user) || (gamService.otherUser && gamService.otherUser.message) ) {
			$interval.cancel(updateUser);
		}
	}, 100);


}]);