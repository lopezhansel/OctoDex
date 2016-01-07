app.controller('indexController', [  "$scope", "$window", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octo",function ($scope,$window, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octo) {
	$scope.signInBtn = octo.signInBtn;
	
	$timeout(() => {
		$scope.signInBtn = octo.signInBtn;
		$scope.octo = octo;
		// console.log($scope.octo.me);
	}, 100);

	$scope.logger = () =>{
		if (octo.me.error) {
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
