app.controller('indexController', [  "$scope", "$window", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService",function ($scope,$window, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {
	$scope.signInBtn = gamService.signInBtn;
	
	$timeout(() => {
		$scope.signInBtn = gamService.signInBtn;
		$scope.gamService = gamService;
	}, 100);


	$scope.logger = () =>{
		if (gamService.me.error) {
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
}]);
