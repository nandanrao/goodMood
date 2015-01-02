angular.module('goodMood')
	.directive('localLogin', function(){
		return {
			restrict: 'E',
			templateUrl: 'js/login/localLogin.html',
			controllerAs: 'localLogin',
			scope: true,
			controller: function($scope, $attrs, User, utils, Auth, $q, $state){
				$scope.form = {}
				$scope.register = false;
				
			}
		}
	})