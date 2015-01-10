angular.module('goodMood')
	.directive('gmSideMenu', function (Auth, User, $document){
		return {
			restrict: 'E',
			templateUrl: 'sidemenu/sidemenu.html',
			controllerAs: 'sidemenu',
			controller: function ($scope){
				$scope.user;

				$scope.$watch(function(){
					// console.log('side menu digest')
				})
				
				User.getCurrentUser().then(function(user){
					$scope.user = user
				})

				this.logout = function(){
					Auth.logout()
				}
			},
		}
	})