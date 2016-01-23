"use strict";

app.directive('inline', ["octo", "$routeParams", function (octo, $routeParams) {

	return {
		restrict: 'EA',

		scope: {
			key: "@",
			user: "="
		},
		templateUrl: "views/inline.html",
		link: link
	};

	function link(scope, element, attrs, controller) {

		//  Error Need to disable edit more when not in my profile

		// checkIfUser interval is to make sure user data has been received form ajax call
		var checkIfUser = setInterval(function () {

			if (scope.user !== null && scope.user !== undefined) {
				var iconChooser = function iconChooser(key) {
					var myIcons = {
						phone: "phone",
						blog: "link",
						company: "business",
						email: "email",
						hireable: "beenhere",
						location: "place"
					};
					return myIcons[key];
				};

				scope.TextValue = scope.user[attrs.key];
				scope.icon = iconChooser(attrs.key);

				scope.showInput = false;
				scope.editMode = function (val) {
					scope.showInput = val;
				};

				scope.showIcon = false;
				scope.iconToggle = function (val) {
					scope.showIcon = scope.showIcon ? false : true;
				};

				scope.updateOcto = function (key) {
					scope.user[key] = scope.TextValue;
				};

				scope.saveBtn = function (bool) {
					if (bool) {
						octo.showSaveBtn = true;
					}
				};

				clearInterval(checkIfUser);
			}
		}, 100);
	}
}]);