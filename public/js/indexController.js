'use strict';

app.controller('indexController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {

	// var index = this;
	$scope.gamService = gamService;
	$scope.hello = "Hello World";

	$interval(function () {
		$scope.gamService = gamService;
		// console.log($scope.gamService.me);
	}, 5000);

	$scope.editMode = function (num, pushOrPop) {
		$scope.myArray = [];
		$scope.myArray[pushOrPop](num);
		return $scope.myArray;
	};
}]);