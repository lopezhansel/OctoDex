app.controller('myProfileController', [  "$scope", '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "gamService",function ($scope, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, gamService) {

	$scope.gamService = gamService;

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

app.directive('inline', ["gamService",function (gamService) {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
		  key: "@",
		},
		templateUrl : "views/inline.html",
		link : link
	};
	function link(scope, element, attrs, controller){

		scope.value= gamService.me[attrs.key];
		scope.icon = iconChooser(attrs.key);

		scope.editMode =  (num ) => {
			if (scope.editMode[num] === 0 || scope.editMode[num] )  { 
				scope.editMode[num] = null;
			}
			else{ scope.editMode[num] = true;}
		};
		scope.updateGam = function (key) {
			gamService.me[key] = scope.value;
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
	}
}]);