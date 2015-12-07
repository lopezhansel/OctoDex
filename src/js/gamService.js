app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout",
	function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

		var gam = this;
		
		$http.get('/api/me').then((response) => {
			gam.me = response.data;
			gam.me.mainList = ["blog", "company", "email", "hireable", "location"];
			$http.get('https://api.github.com/users/'+gam.me.username+'/followers').then((response) => { 
				gam.me.followers = response.data;
			});
			$http.get('https://api.github.com/users/'+gam.me.username+'/repos').then((response) => { 
				gam.me.repos = response.data;
			});
		});

		gam.sendData = function (){
			$http.put('/api/me', gam.me).then( (response) =>{
				console.log(response.data);
			});
		};
}]);


