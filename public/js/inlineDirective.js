"use strict";

app.directive('inline', ["octo", "$routeParams", function (octo, $routeParams) {
	console.log("inline directive boot");

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
		console.log("inline directive");
		console.log("scope.user", scope.user);
		//  Error Need to disable edit more when not in my profile
		var checkIfUser = setInterval(function () {

			// console.log("scope",scope);
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

				console.log(scope.user.name);
				console.log("inside loop");
				scope.TextValue = scope.user[attrs.key];
				scope.icon = iconChooser(attrs.key);

				scope.editMode = function (value) {
					if (scope.editMode[value] === 0 || scope.editMode[value]) {
						scope.editMode[value] = null;
					} else {
						scope.editMode[value] = true;
					}
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