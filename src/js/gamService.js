app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout",
	function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

		var gam = this;
		
		$http.get('/api/me').then((response) => {
			gam.me = response.data;
			console.log(response.data);
		});



}]);