var app = angular.module('gitAtMe',["ngMaterial","ngAnimate","ngAria","ngRoute"]); 

app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		controller : "myProfileController",
		templateUrl : "views/myProfile.html"
	}).when('/profile/:id',{
		controller : "otherProfileController",
		templateUrl : "views/otherProfile.html"
	}).otherwise({ redirectTo: '/' });
	// $locationProvider.html5Mode(true);

});