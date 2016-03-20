module.exports = function (app) {
	app.directive('odSidenav', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			template : require("../../public/views/odSidenav.html"),
		};
	}])
	.directive('odRepos', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			template : require("../../public/views/odRepos.html"),
		};
	}])
	.directive('odFollowers', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			template : require("../../public/views/odFollowers.html"),
		};
	}])
	.directive('odFollowing', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			template : require("../../public/views/odFollowing.html"),
		};
	}])
	.directive('odWelcome', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			template : require("../../public/views/odWelcome.html"),
		};
	}])
	.directive('odCard', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			template : require("../../public/views/odCard.html"),
		};
	}])
	.directive('odGroups', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			scope: {
			  groups: "="
			},
			template : require("../../public/views/odGroups.html"),
		};
	}])
	.directive('odReadme', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			template : require("../../public/views/odReadme.html"),
		};
	}]);
};