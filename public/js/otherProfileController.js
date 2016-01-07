'use strict';

app.controller('otherProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octo", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octo) {
	console.log("otherProfileController");
	// octo[$routeParams.user] = null;
	octo.getAnotherUser($routeParams.user);
	// $scope.user = octo[$routeParams.user];

	var updateUser = $interval(function () {
		console.log("inside interval");
		$scope.user = octo.otherUsers[$routeParams.user];
		console.log(octo.otherUsers[$routeParams.user]);
		if ($scope.user && $scope.user.login === $routeParams.user || octo.otherUsers[$routeParams.user] && octo.otherUsers[$routeParams.user].message) {
			console.log("canceling interval");
			console.log(octo.otherUsers[$routeParams.user]);

			$interval.cancel(updateUser);
		}
	}, 5);
}]);