angular.module('goodMood')
	.directive('navigateIterationsButtonMobile', function ($ionicHistory, $state){
		return {
			restrict: 'E', 
			templateUrl: 'iteration/navigateiterationsbutton.html',
			controllerAs: 'navigateIterations',
			controller: function ($scope, $element, $attrs){
				var arrow = {
					next: '40.2,37.4 90,49.9 139.9,37.4',
					previous: '139.9,47.3 90,34.8 40.2,47.3',
				}

				$scope.arrow = arrow[$attrs.direction]
				
				this.go = function(){
					console.log('clicked')
					$ionicHistory.nextViewOptions({
						disableAnimate: true
					})
					$state.go('iteration', {c_id: $scope.collaboration.$id, i_id: $scope[$attrs.direction]})
				}
			}
		}
	})