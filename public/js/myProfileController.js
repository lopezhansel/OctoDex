'use strict';

app.controller('myProfileController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {

	$scope.gamService = gamService;
	$scope.hello = "Hello World";

	$timeout(function () {
		$scope.gamService = gamService;
		console.log($scope.gamService.me);
		if (!$scope.gamService.me) {}
	}, 100);

	$scope.editMode = function (num, pushOrPop) {
		if ($scope.editMode[num] === 0 || $scope.editMode[num]) {
			$scope.editMode[num] = null;
		} else {
			$scope.editMode[num] = true;
		}
	};

	$scope.iconChooser = function (key) {
		var myIcons = {
			phone: "phone",
			blog: "link",
			company: "business",
			email: "email",
			hireable: "beenhere",
			location: "place"
		};
		return myIcons[key];
	};
}]);