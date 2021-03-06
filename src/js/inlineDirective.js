module.exports = function (app) {
	app.directive('inline', ["octoService","$routeParams",function (od,$routeParams) {
		return {
			restrict: 'EA',
			scope: {
			  key: "@",
			  value: "="
			},
			template : require("../../public/views/inline.html"),
			link : linkFUnc 
		};
		function linkFUnc (scope, element, attrs, controller){
			scope.od = od;
			//Sets icon for element if key was provided
			scope.icon = iconChooser(attrs.key);
			// If not at home disable editing
			scope.isClient = ($routeParams.user)? false : true;
			if (scope.isClient){
				// initializers 
				scope.inputShow = false;
				scope.pencilIcon = false; // I wanted to name this editIcon, Someone might misunderstand
				// toggles 
				scope.toggleInput =  (val ) => {
					scope.inputShow = val;
				};
				scope.togglePencil =  () => {
					scope.pencilIcon = (scope.pencilIcon)? false : true;
				};
			}
			// od.showSaveBtn  is the orange "UPDATE PROFILE" button
			scope.dirtyElem = (bool) => {
				if(bool){
					od.showSaveBtn = true;  // trigger "UPDATE PROFILE" button
					element.css('color', "#FF5722"); // change dirty element to orange
					// pushed dirty elements into dirtyInlineElem 
					od.dirtyInlineElem.push(element);
				}
			};
			// chooses icons provided by 'material icons'
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
};