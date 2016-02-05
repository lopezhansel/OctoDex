app.controller('indexController', [  "$scope","$mdSidenav", "$window", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",function ($scope,$mdSidenav,$window, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {
	$scope.signInBtn = octoService.signInBtn;
	
	$scope.octoService = octoService;

	$scope.logger = () =>{
		if (octoService.client.error) {
			$window.open("/auth/github","_self");
		}
		else {
			$window.open("/logout","_self");
		}
	};

	$scope.isAtHome = function () {
		return $location.$$path !== '/';
	};
	$scope.redirect = function (str) {
		$location.path(str);
	};
	$scope.toggleSidenav = function (menuId) {
		$mdSidenav(menuId).toggle();
	};
}]);
