app.controller('indexController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {
	
	// var index = this;
	$scope.gamService = gamService;
	$scope.hello = "Hello World";

	$timeout(() => {
		$scope.gamService = gamService;
		console.log($scope.gamService.me);
		if (!$scope.gamService.me){
		}
	}, 100);

	$scope.editMode =  (num , pushOrPop) => {
		$scope.myArray = [];
		$scope.myArray[pushOrPop](num);
		return $scope.myArray;
	};

	
}]);