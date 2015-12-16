app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout",
	function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

		console.log("gamService");
		var gam = this;
		gam.signInBtn = "Sign In";
		var secret = '?client_id=8b92ef6de8d9f80357f2&client_secret=5032c27da0701378876cf2ecf58e5e381b50ba93';

		$http.get('/api/me').then((response) => {
			console.log('/api/me',response.data);
			gam.me = response.data;
			if (gam.me.error) { return ;}
			gam.getFollowers(gam.me);
			gam.getRepos(gam.me);
			gam.signInBtn = "Sign out";
		});

		gam.getFollowers = (user) => {
			$http.get('https://api.github.com/users/'+user.username+'/followers'+secret).then((response) => { 
				user.followers = response.data;
				// console.log(user.followers);
			});
		};

		gam.getOtherUser = (user) => {
			$http.get('https://api.github.com/users/'+user+secret).then((response) => { 
				console.log("otherUser",response.data);

				gam[$routeParams.user] = response.data;
				gam[$routeParams.user].username = gam[$routeParams.user].login;
				gam.getFollowers(gam[$routeParams.user]);
				gam.getRepos(gam[$routeParams.user]);
			},(response)=>{
				gam[$routeParams.user] = response.data;
			});
		};

		gam.getRepos = (user) => {
			$http.get('https://api.github.com/users/'+user.username+'/repos'+secret).then((response) => { 
				user.repos = response.data;
				// console.log(user.repos);
			});
		};

		gam.sendData = () => {
			$http.put('/api/me', gam.me).then( (response) =>{
				// console.log(response.data);
			});
		};
}]);

