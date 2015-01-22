angular.module('goodMood')
	.directive('newIterationCancelButtonMobile', function ($ionicHistory, $state, Auth){
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			controllerAs: 'newIterationCancel', 
			template: '<button ng-click="newIterationCancel.cancel()" class="ion-close" nav-direction="back"></button>',
			controller: function ($scope, $element, $attrs){
				this.cancel = function(){
					if (!$scope.collaboration.iterations){
						console.log($scope.collaboration, Auth.currentUser)
						Auth.currentUser.$removeCollaboration($scope.collaboration.$id)
							.then($scope.collaboration.$eliminate.bind($scope.collaboration))
							.then(function(){
								console.log('collaboration deleted')
							})
						$ionicHistory.nextViewOptions({
						  historyRoot: true
						});
						$state.go('home')
						return
					}
					$ionicHistory.goBack()
				}
			}
		}
	})