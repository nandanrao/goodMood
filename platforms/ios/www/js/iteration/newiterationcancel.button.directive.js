angular.module('goodMood')
	.directive('newIterationCancelButtonMobile', function ($ionicHistory){
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			controllerAs: 'newIterationCancel', 
			template: '<button ng-click="newIterationCancel.cancel()" class="ion-close" nav-direction="back"></button>',
			controller: function ($scope, $element, $attrs){
				this.cancel = function(){
					$ionicHistory.goBack()
				}
			}
		}
	})