"use strict";

// initiate angular app and load in other dependencies.
var app = angular.module('octodex', ["ngMaterial", "ngAnimate", "ngAria", "ngRoute", "ngResource"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		controller: "myProfileController",
		templateUrl: "views/profileView.html"
	}).when('/profile/:user', {
		controller: "otherProfileController",
		templateUrl: "views/profileView.html"
	}).otherwise({ redirectTo: '/' });
	// $locationProvider.html5Mode(true);
});