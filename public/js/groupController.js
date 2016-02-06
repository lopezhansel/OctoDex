'use strict';

app.controller('groupController', ["$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService", function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {

	var group = $routeParams.group; // just an alias
	octoService.getOrganizations(group); // Fetch profile
	$scope.atHome = $location.path() === "/" ? true : false;
}]);