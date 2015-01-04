angular.module('goodMood')
	.directive('gmSideMenu', function (Auth, User){
		return {
			restrict: 'E',
			templateUrl: 'sidemenu/sidemenu.html',
			controllerAs: 'sidemenu',
			controller: function ($scope){
				$scope.user;
				
				User.getCurrentUser().then(function(user){
					$scope.user = user
				})

				this.logout = function(){
					Auth.logout()
				}
			},
		}
	})