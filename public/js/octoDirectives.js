"use strict";

app.directive('odSidenav', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		templateUrl: "views/odSidenav.html"
	};
}]).directive('odRepos', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		templateUrl: "views/odRepos.html"
	};
}]).directive('odFollowers', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		templateUrl: "views/odFollowers.html"
	};
}]).directive('odFollowing', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		templateUrl: "views/odFollowing.html"
	};
}]).directive('odWelcome', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		templateUrl: "views/odWelcome.html"
	};
}]).directive('odCard', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		templateUrl: "views/odCard.html"
	};
}]).directive('odGroups', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		scope: {
			groups: "="
		},
		templateUrl: "views/odGroups.html"
	};
}]).directive('odReadme', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		scope: {
			groups: "="
		},
		templateUrl: "views/odReadme.html"
	};
}]);