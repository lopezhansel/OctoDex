app.controller('otherProfileController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octo",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octo) {
	// octo[$routeParams.user] = null;
	octo.getAnotherUser($routeParams.user);
	// $scope.user = octo[$routeParams.user];
	$scope.atHome = ($location.path() === "/")? true : false;
	$scope.toggleFullProfileSwitch = function  () {
		$scope.fullProfileSwitch = !$scope.fullProfileSwitch;
	};
	$scope.fullProfileSwitch = false;


	var updateUser = $interval( () => {
		$scope.user = octo.otherUsers[$routeParams.user];
		console.log( octo.otherUsers[$routeParams.user]);
		if (($scope.user && $scope.user.login === $routeParams.user) || (octo.otherUsers[$routeParams.user] && octo.otherUsers[$routeParams.user].message) ) {

			$interval.cancel(updateUser);
		}
	}, 5);


}]);

