module.exports = function (app) {
	app.controller('groupController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, od) {
		
		var group = $routeParams.group; // just an alias
		od.getOrganizations(group); // Fetch profile
		$scope.selectGroup = group;

	}])
	.controller('accountController', 
		[  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",
		function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, od) {

	}]);
};
