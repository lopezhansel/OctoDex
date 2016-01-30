"use strict";

app.directive('inline', ["octoService", "$routeParams", function (octoService, $routeParams) {
	return {
		restrict: 'EA',
		scope: {
			key: "@",
			value: "="
		},
		templateUrl: "views/inline.html",
		link: linkFUnc
	};
	function linkFUnc(scope, element, attrs, controller) {
		scope.octoService = octoService;
		//Sets icon for element if key was provided
		scope.icon = iconChooser(attrs.key);
		// If not at home disable editing
		scope.isClient = $routeParams.user ? false : true;
		if (scope.isClient) {
			// initializers
			scope.inputShow = false;
			scope.pencilIcon = false; // I wanted to name this editIcon, Someone might misunderstand
			// toggles
			scope.toggleInput = function (val) {
				scope.inputShow = val;
			};
			scope.togglePencil = function () {
				scope.pencilIcon = scope.pencilIcon ? false : true;
			};
		}
		// octoService.showSaveBtn  is the orange "UPDATE PROFILE" button
		scope.dirtyElem = function (bool) {
			if (bool) {
				octoService.showSaveBtn = true; // trigger "UPDATE PROFILE" button
				element.css('color', "#FF5722"); // change dirty element to orange
				// pushed dirty elements into inlineElem
				octoService.inlineElem.push(element);
			}
		};
		// chooses icons provided by 'material icons'
		function iconChooser(key) {
			var myIcons = {
				phone: "phone",
				blog: "link",
				company: "business",
				email: "email",
				hireable: "beenhere",
				location: "place"
			};
			return myIcons[key];
		}
	}
}]);