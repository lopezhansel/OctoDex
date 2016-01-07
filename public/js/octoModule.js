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

// enable "view full profile " button
// fix edit mode in directive

// change port to 2000
// save user data into database

// rename gam files