// initiate angular app and load in other dependencies.
var app = angular.module('octodex',["ngMaterial","ngAnimate","ngAria","ngRoute","ngResource","ngFileUpload"]); 


app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		controller : "myProfileController",
		template : require("../../public/views/profileView.html")
	}).when('/profile/:user',{
		controller : "otherProfileController",
		template : require("../../public/views/profileView.html")
	}).when('/groups/:group',{
		controller : "groupController",
		template : require("../../public/views/groupView.html")
	}).when('/account',{
		controller : "myProfileController",
		template : require("../../public/views/accountView.html")
	}).when('/about',{
		controller : "myProfileController",
		template : require("../../public/views/readmeView.html")
	}).otherwise({ redirectTo: '/' });
	// $locationProvider.html5Mode(true);
}]);	

app.config(['$mdThemingProvider',function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('light-blue');
}]);

module.exports = app;