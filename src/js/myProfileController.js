app.controller('myProfileController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octo",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octo) {
	$scope.atHome = ($location.path() === "/")? true : false;
	$scope.octo = octo;
	$scope.user = octo.me;
	
	$timeout(() => {
		$scope.octo = octo;
		if (!$scope.octo.me){	
		}
	}, 1000);	

	$scope.updateUser = octo.updateUser;


}]);
