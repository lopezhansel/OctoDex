app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout",
	function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

		var gam = this;
		
		$http.get('/api/me').then((response) => {
			gam.me = response.data;
		});

		gam.sendData = function (data){
			$http.psot('/api/me', data).then( (response) =>{
				console.log(response);
			});

		};

		




}]);