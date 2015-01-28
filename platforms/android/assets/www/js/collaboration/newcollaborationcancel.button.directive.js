angular.module('goodMood')
	.directive('newCollaborationCancelButtonMobile', function ($ionicHistory, $state){
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			controllerAs: 'newCollaborationCancel', 
			template: '<button ng-click="newCollaborationCancel.cancel()" class="ion-close" nav-direction="back"></button>',
			controller: function ($scope, $element, $attrs){
				this.cancel = function(){
					$ionicHistory.nextViewOptions({
					  historyRoot: true
					});
					$state.go('home')
				}
			}
		}
	})