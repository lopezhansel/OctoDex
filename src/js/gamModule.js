var app = angular.module('gitAtMe',["ngMaterial","ngAnimate","ngAria","ngRoute"]); 

app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		controller : "indexController",
		templateUrl : "views/myProfile.html"
	}).when('/profile/:id',{
		controller : "indexController",
		templateUrl : "views/homeView.html"
	}).otherwise({ redirectTo: '/' });
	// $locationProvider.html5Mode(true);

});