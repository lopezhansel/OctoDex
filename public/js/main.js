"use strict";

var app = angular.module('gitMe', ["ngMaterial", "ngAnimate", "ngAria"]);
app.controller('MainController', function () {
	this.hello = "Hello World";
	var hello = [1, 2, 3, 4, 5];
	hello.forEach(function (el) {
		return el * 2;
	});
	console.log(hello);
});