module.exports = function (app) {
	app.controller('indexController', [  "$scope","$mdSidenav", "$window", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",function ($scope,$mdSidenav,$window, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, od) {
		$scope.$mdMedia = $mdMedia;
		
		$scope.od = od;
		// $scope.client = od.getClient()	;
		
		// Check if Client is Logged in using GET . client is an instance of OctoApi
		od.OctoApi.getClient(function(data) { // client.error = "not logged in" || client.login
			od.client = data;
			od.client.isLoggedIn = (od.client.error) ? false : true; // If not loggedIn then od.client.error = "not logged in"
			od.signInBtnTxt = (od.client.isLoggedIn) ? "Sign out" : "Sign In";
			// If od.client is logged and doesn't have repos||followers then fetch github
			// BUG : followers and repos wont get updated ever
			if (od.client.error) {
				return;
			}
			od.client.repoUpdate = (od.client.reposArray.length !== od.client.public_repos);
			od.client.followerUpdate = (od.client.followersArray.length !== od.client.followers);
			if (od.client.followerUpdate || od.client.repoUpdate) {
				od.client.gitReposFollowers();
			}
		});

		$scope.toggleLink = function () {
			$scope.linkBool = ($scope.linkBool)? false: true;
		};

		$scope.link = "http://lopezhansel.com:2000/#/profile/";

		$scope.logger = () =>{
			if (od.client.error) {
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
