// initiate angular app and load in other dependencies.
var app = angular.module('octodex',["ngMaterial","ngAnimate","ngAria","ngRoute","ngResource","ngFileUpload"]); 


app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		controller : "myProfileController",
		templateUrl : "views/profileView.html"
	}).when('/profile/:user',{
		controller : "otherProfileController",
		templateUrl : "views/profileView.html"
	}).when('/groups/:group',{
		controller : "groupController",
		templateUrl : "views/groupView.html"
	}).when('/account',{
		controller : "myProfileController",
		templateUrl : "views/accountView.html"
	}).when('/about',{
		controller : "myProfileController",
		templateUrl : "views/readmeView.html"
	}).otherwise({ redirectTo: '/' });
	// $locationProvider.html5Mode(true);
}]);	

app.config(['$mdThemingProvider',function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('light-blue');
}]);

module.exports = app;