var app = angular.module('gitAtMe',["ngMaterial","ngAnimate","ngAria","ngRoute"]); 

app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		controller : "myProfileController",
		templateUrl : "views/myProfile.html"
	}).when('/profile/:user',{
		controller : "otherProfileController",
		templateUrl : "views/myProfile.html"
	}).otherwise({ redirectTo: '/' });
	// $locationProvider.html5Mode(true);
});