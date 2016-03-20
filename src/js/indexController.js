module.exports = function (app) {
	app.controller('indexController', [  "$scope","$mdSidenav", "$window", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",function ($scope,$mdSidenav,$window, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, octoService) {
		$scope.$mdMedia = $mdMedia;
		
		$scope.octoService = octoService;
		$scope.od = octoService;
		// $scope.client = octoService.getClient()	;
		
		// Check if Client is Logged in using GET . client is an instance of OctoApi
		octoService.OctoApi.getClient(function(data) { // client.error = "not logged in" || client.login
			octoService.client = data;
			octoService.client.isLoggedIn = (octoService.client.error) ? false : true; // If not loggedIn then octoService.client.error = "not logged in"
			octoService.signInBtnTxt = (octoService.client.isLoggedIn) ? "Sign out" : "Sign In";
			// If octoService.client is logged and doesn't have repos||followers then fetch github
			// BUG : followers and repos wont get updated ever
			if (octoService.client.error) {
				return;
			}
			octoService.client.repoUpdate = (octoService.client.reposArray.length !== octoService.client.public_repos);
			octoService.client.followerUpdate = (octoService.client.followersArray.length !== octoService.client.followers);
			if (octoService.client.followerUpdate || octoService.client.repoUpdate) {
				octoService.client.gitReposFollowers();
			}
		});

		$scope.toggleLink = function () {
			$scope.linkBool = ($scope.linkBool)? false: true;
		};

		$scope.link = "http://lopezhansel.com:2000/#/profile/";

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
};
