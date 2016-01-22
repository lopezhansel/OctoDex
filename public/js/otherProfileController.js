'use strict';

app.controller('otherProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octo", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octo) {
	// octo[$routeParams.user] = null;
	octo.getAnotherUser($routeParams.user);
	// $scope.user = octo[$routeParams.user];

	var updateUser = $interval(function () {
		$scope.user = octo.otherUsers[$routeParams.user];
		console.log(octo.otherUsers[$routeParams.user]);
		if ($scope.user && $scope.user.login === $routeParams.user || octo.otherUsers[$routeParams.user] && octo.otherUsers[$routeParams.user].message) {

			$interval.cancel(updateUser);
		}
	}, 5);
}]);