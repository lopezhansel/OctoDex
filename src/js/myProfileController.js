app.controller('myProfileController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {

	$scope.gamService = gamService;
	$scope.user = gamService.me;

	$timeout(() => {
		$scope.gamService = gamService;
		if (!$scope.gamService.me){	
		}
	}, 1000);	

	$scope.update = function () {
		// here it will update server
		console.log(gamService.me);
	};

}]);

app.directive('inline', ["gamService","$routeParams",function (gamService,$routeParams) {
	console.log("inline directive boot");

	return {
		restrict: 'EA',

		scope: {
		  key: "@",
		  user: "="
		},
		templateUrl : "views/inline.html",
		link : link
	};



	function link(scope, element, attrs, controller){
		console.log("inline directive");
		console.log("scope.user",scope.user);
		//  Error Need to disable edit more when not in my profile
		var checkIfUser = setInterval(function() {

			// console.log("scope",scope);
			if(scope.user  !== null && scope.user  !== undefined ){

				console.log(scope.user.name);
				console.log("inside loop");
				scope.value= scope.user[attrs.key];
				scope.icon = iconChooser(attrs.key);
				
				scope.editMode =  (value ) => {
					if (scope.editMode[value] === 0 || scope.editMode[value] )  { 
						scope.editMode[value] = null;
					}
					else{ scope.editMode[value] = true;}
				};
				
				scope.updateGam = function (key) {
					scope.user[key] = scope.value;
				};
				
				scope.saveBtn = function (bool) {
					if(bool){
						gamService.showSaveBtn = true;
					}
				};
				
				
				function iconChooser (key) {
					var myIcons= {
						phone : "phone",
						blog  : "link",
						company : "business",
						email : "email",
						hireable : "beenhere" ,
						location : "place"
					};
					return myIcons[key];	
				}
				clearInterval(checkIfUser);
			}

		}, 100);
	}
}]);