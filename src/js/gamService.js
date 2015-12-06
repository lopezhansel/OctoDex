app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout",
	function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

		var gam = this;
		
		$http.get('/api/me').then((response) => {
			gam.me = response.data;
			gam.me.mainList = {
				blog:  gam.me.blog, 
				company : gam.me.company, 
				email : gam.me.email, 
				hireable : gam.me.hireable, 
				location : gam.me.location
			};
		});

		gam.sendData = function (){
			$http.put('/api/me', gam.me).then( (response) =>{
				console.log(response.data);
			});
		};
}]);


