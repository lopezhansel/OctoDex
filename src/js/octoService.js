module.exports = function (app) {
	app.service('octoService', ['$window','$q','$document','$routeParams','$resource', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", function ($window,$q,$document,$routeParams,$resource, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout)  {
		
	    var signInBtnTxt = "Sign In", showSaveBtn = false, cachedUsers = {}, dirtyInlineElem = [], organizations = {};

		// $resource Creates is a class with ajax methods
		var OctoApi = $resource('/api/users/:login', {login: '@login'}, {
			getClient:    {method:'GET', url:"api/me"},
			updateClient: {method:'POST',url:"api/me"},
			search:       {method:'GET', url:"api/users",isArray : true},
			check:        {method:'GET', url:"api/users/:userParam",params:{userParam:"@login"},isArray : true},
			searchGit:    {method:'GET', url:"https://api.github.com/search/users",params:{userParam:"@login"}}
		}); 	
		OctoApi.prototype.gitUser = function  ()  {
			// the context of this is carried over by =>
			return $http.get("https://api.github.com/users/"+ this.login)
				.then( res => _.assignIn(this,res.data) , ifErrFn);
		};

		OctoApi.prototype.gitReposFollowers =  function (userObj) {
			// Check Etag before going to github
			return $q.all([
				$http.get(`https://api.github.com/users/${this.login}/repos`),
				$http.get(`https://api.github.com/users/${this.login}/following`),
				$http.get(`https://api.github.com/users/${this.login}/followers`)
			]).then( results => {
				this.reposArray     = results[0].data;
				this.followingArray = results[1].data;
				this.followersArray = results[2].data;
				return this;
			}, ifErrFn);
		};
		OctoApi.prototype.getCard = function() {
			$http.post('/getCard', this)// The context of 'this' is carried over with the fat arrow
				.then(response => downloadVcard(this.login + ".vcf", response.data), ifErrFn);
		};

		// Get 20 Users Skip 1
		// OctoApi.search({limit: 20, skip: 1 }, arr => arr.forEach(user => cachedUsers[user.login] = user) );

		var getOrganizations = function (orgStr) {
			OctoApi.search({organizations: orgStr }, function(data) {
				if (!data.length) {OctoApi.prototype.gitOrg(orgStr); }
				organizations[orgStr] = {};
				data.forEach(function(el) {
					organizations[orgStr][el.login] = el;
				});
			});
		};
		// getOrganizations("RefactorU");

		OctoApi.prototype.gitOrg = function(orgStr) {
			$http.get(`https://api.github.com/orgs/${orgStr}/members`)
				.then( ({data}) => {
					organizations[orgStr] = {};
					data.forEach((user) => organizations[orgStr][user.login] = user);
				},ifErrFn);
		};


		var getClient = function  () {
			console.log(this.client);
			return this.client;
		};

		// POST method.  Reminder: client is an instance of OctoApi
		var updateClient = function () {
			foreachElement(dirtyInlineElem, "#79E1FF"); // change to blue while POSTing
			if (($location.path() !== "/") && ($location.path() !== "/account")){ return; } // only update if at home or account page uri

			od.client.$updateClient(function (response) { // Post Method . Sends client
				od.client.isLoggedIn = (od.client.error)? false : true;// 
				if (response.error){ // incase of failure. Like if there a duplicate 
					foreachElement(dirtyInlineElem, "#FF3838"); // change color to red if erro
					alert("Sorry Something went wrong. Please Try again in a few minutes.");
				} else{
					showSaveBtn = false; // orange "Update Profile" Button
					foreachElement(dirtyInlineElem, "#333333"); // change back to black if success
				}

			});
		};


		// getOtherUsers is for retrieving another users that are not the client profile 
		var getOtherUsers = function (userObj)  {
			var login = userObj || $routeParams.user; // login is the gitHub login name
			// if user is already cached then exit 
			if (cachedUsers[login]) {
				if ((cachedUsers[login].reposArray === null) || (cachedUsers[login].followersArray === null) ){
					// Temporary fix for mongo performance. Retrieving RefactorU Student data used to be really heavy.
					cachedUsers[login].gitReposFollowers();
				}
				return; 
			}
			OctoApi.check({userParam:login},function (userArr,responseHeaders) {
				if (userArr.length) { // If user Exist.
					cachedUsers[login] = userArr[0];
				}else{
					cachedUsers[login] = new OctoApi({login});
					cachedUsers[login].gitUser()
					.then(user => user.gitReposFollowers());
				}				
			});
		};

		var od = this;
		od = {signInBtnTxt,cachedUsers,dirtyInlineElem,organizations,getProp,downloadVcard,foreachElement,getOrganizations,getClient,updateClient,showSaveBtn,getOtherUsers,OctoApi};
		return od; 

		function ifErrFn (errObj){
			var statusText = (errObj.statusText)? errObj.statusText : " Error";
			alert(`Sorry something went wrong: ${statusText}`);
			console.log("Sorry something went wrong:",errObj.data);
		}
		function getProp(prop, obj) {
			return (obj) ? obj[prop] : this[prop];
		}

		function downloadVcard(filename, text) {
			var elem = document.createElement('a');
			elem.setAttribute('href', `data:text/vcard;charset=utf-8,${encodeURIComponent(text)}`);
			elem.setAttribute('download', filename);
			elem.style.display = 'none';
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
		}
		// function to update each element's css properties and values
		function foreachElement(array, value, prop) {
			prop = prop || "color";
			array.forEach(function(el) {
				el.css(prop, value);
			});
		}
	}]);
};