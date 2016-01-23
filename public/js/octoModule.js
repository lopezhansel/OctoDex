"use strict";

// initiate angular app and load in other dependencies.
var app = angular.module('octodex', ["ngMaterial", "ngAnimate", "ngAria", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		controller: "myProfileController",
		templateUrl: "views/myProfile.html"
	}).when('/profile/:user', {
		controller: "otherProfileController",
		templateUrl: "views/myProfile.html"
	}).otherwise({ redirectTo: '/' });
	// $locationProvider.html5Mode(true);
});

// fix edit mode in directive
// save user data into database
// say if octodex user or not
// Fix Api to request more info from github
// shareable link