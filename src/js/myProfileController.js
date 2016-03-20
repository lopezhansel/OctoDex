module.exports = function (app) {
	app.controller('myProfileController', 
		[  "$scope",'Upload', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", "$location", "$timeout", "octoService",
		function ($scope,Upload, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, $location, $timeout, od) {

		
		// interval to check if update ajax request came back
		var updateUserInterval = $interval( () => {
			var me = od.client;
			// if me exist with a .githubId or .error  properties
			if (me && (me.githubId  ||  me.error)) {
				// then set $scope.user;
				$scope.user = me;
				$interval.cancel(updateUserInterval);
			}
		}, 20);


		$scope.submit = function() {
		     if ($scope.form.file.$valid && $scope.file) {
		       $scope.upload($scope.file);
		     }
		   };
		   $scope.upload = function (file) {
		       Upload.upload({
		           url: 'upload',
		           data: {file: file}
		       }).then(function (resp) {
		           console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		       }, function (resp) {
		           console.log('Error status: ' + resp.status);
		       }, function (evt) {
		           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		           console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		       });
		   };

	}]);
};
