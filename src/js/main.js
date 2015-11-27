var app = angular.module('gitMe',["ngMaterial","ngAnimate","ngAria"]); 
app.controller('MainController',function() {
	this.hello = "Hello World";
	let hello = [1,2,3,4,5];
	hello.forEach(el => el*2);
	console.log(hello);
});