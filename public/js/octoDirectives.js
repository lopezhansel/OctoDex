"use strict";

app.directive('odSidenav', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		templateUrl: "views/odSidenav.html"
	};
}]);