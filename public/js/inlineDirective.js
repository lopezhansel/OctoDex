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
				scope.dirty = true;
				scope.inputVisability = false;
				scope.toggleInput = function (val) {
					scope.inputVisability = val;
				};

				scope.iconVisability = false;
				scope.toggleIcon = function (val) {
					scope.iconVisability = scope.iconVisability ? false : true;
				};

				scope.updateOcto = function (key) {
					scope.user[key] = scope.TextValue;
				};

				scope.showSaveBtn = function (bool) {
					if (bool) {
						octo.showSaveBtn = true;
						element.css('color', "#FF5722");
					}
				};

				clearInterval(checkIfUser);
			}
		}, 100);
	}
}]);