app.controller('myProfileController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {
	$scope.atHome = ($location.path() === "/")? true : false;
	$scope.octoService = octoService;
	$scope.user = octoService.client;
	$scope.toggleFullProfileSwitch = function  () {
		$scope.fullProfileSwitch = !$scope.fullProfileSwitch;
	};
	$scope.fullProfileSwitch = false;
	$timeout(() => {
		$scope.octoService = octoService;
		if (!$scope.octoService.client){	
		}
	}, 1000);	

	$scope.updateClient = octoService.updateClient;


}]);
