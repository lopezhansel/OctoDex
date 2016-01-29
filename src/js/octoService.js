app.service('octo', ['$routeParams','$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout",
	function($routeParams,$resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout) {
		
		var octo = this; // just an alias for this
		octo.signInBtn = "Sign In";// text of the sign in button 
		var secret = ' ';
		octo.showSaveBtn = false;
		var apiME = $resource('/api/me', {}, {});

		// // First action to do is check if user is logged in. 
		octo.client = apiME.get(function () { // octo.client.error = "not logged in" || octo.client.username
			octo.client.isLoggedIn = (octo.client.error)? false : true;
			octo.signInBtn = (octo.client.isLoggedIn)? "Sign out": "Sign In";
			// if client is not logged in octo.client will have a error property 
			if (octo.client.isLoggedIn) {
				// if logged in, will trigger the following two functions to retrieve more data about the github user
				if (!octo.client.repos.length || !octo.client.followers.length){
					octo.getFollowers(octo.client);
					octo.getRepos(octo.client);
				}
			}
		});
		
		octo.getFollowers = (user) => {
			// the 'user' parameter contains information about the client that the server sent to us
			$http.get('https://api.github.com/users/' + user.username + '/followers' + secret).then((response) => {
				user.followers = response.data;
				octo.updateUser();

			});
		};

		octo.getRepos = (user) => {
			// the 'user' parameter contains information about the client that the server sent to us
			$http.get('https://api.github.com/users/' + user.username + '/repos' + secret).then((response) => {
				user.repos = response.data;
				octo.updateUser();
			});
		};
		octo.otherUsers = {};

		// getAnotherUser is for retrieving another user that is not the client profile 
		octo.getAnotherUser = (user) => {
			$http.get('https://api.github.com/users/' + user + secret).then((response) => {
				octo.otherUsers[$routeParams.user] = response.data;
				octo.otherUsers[$routeParams.user].username = octo.otherUsers[$routeParams.user].login;
				octo.getFollowers(octo.otherUsers[$routeParams.user]);
				octo.getRepos(octo.otherUsers[$routeParams.user]);
			}, (response) => {
				octo.otherUsers[$routeParams.user] = response.data;
			});
		};


		octo.updateUser = function () {
			octo.client.$save(function (response) {
				octo.client.isLoggedIn = (octo.client.error)? false : true;
				if (response.error){
					alert("Sorry Something went wrong. Please Try again in a few minutes.");
				}
				else{
					octo.showSaveBtn = false;
				}
			});
		};


	}
]);