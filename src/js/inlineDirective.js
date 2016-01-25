app.directive('inline', ["octo","$routeParams",function (octo,$routeParams) {

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

		//  Error Need to disable edit more when not in my profile

		// checkIfUser interval is to make sure user data has been received form ajax call
		var checkIfUser = setInterval(function() {

			if(scope.user  !== null && scope.user  !== undefined ){

				scope.textValue = scope.user[attrs.key];

				scope.icon = iconChooser(attrs.key);

				scope.inputVisability = false;
				scope.toggleInput =  (val ) => {
					scope.inputVisability = val;
				};

				scope.iconVisability = false;
				scope.toggleIcon =  (val ) => {
					scope.iconVisability = (scope.iconVisability)? false : true;
				};

						
				scope.showSaveBtn = function (bool) {
					if(bool){
						octo.showSaveBtn = true;
						element.css('color', "#FF5722"); 
						console.log(scope.user.email);
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