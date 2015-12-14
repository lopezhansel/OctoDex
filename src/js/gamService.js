app.service('gamService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout",
	function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {

		var gam = this;
		gam.signInBtn = "Sign In";

		$http.get('/api/me').then((response) => {
			gam.me = response.data;
			if (gam.me.error) { return ;}
			gam.me.mainList = ["blog", "company", "email", "hireable", "location"];
			gam.getFollowers(gam.me);
			gam.getRepos(gam.me);
			gam.signInBtn = "Sign out";
		});

		gam.getFollowers = (user) => {
			$http.get('https://api.github.com/users/'+user.username+'/followers').then((response) => { 
				user.followers = response.data;
				console.log(user.followers);
			});
		};

		gam.getOtherUser = (user) => {
			$http.get('https://api.github.com/users/'+user).then((response) => { 
				gam.otherUser = response.data;
				gam.otherUser.username = gam.otherUser.login;
				gam.otherUser.mainList = ["blog", "company", "email", "hireable", "location"];
				gam.getFollowers(gam.otherUser);
				gam.getRepos(gam.otherUser);
			},(response)=>{
				gam.otherUser = response.data;
			});
		};

		gam.getRepos = (user) => {
			$http.get('https://api.github.com/users/'+user.username+'/repos').then((response) => { 
				user.repos = response.data;
				console.log(user.repos);
			});
		};

		gam.sendData = () => {
			$http.put('/api/me', gam.me).then( (response) =>{
				// console.log(response.data);
			});
		};
}]);

