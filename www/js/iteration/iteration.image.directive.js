angular.module('goodMood')	
	.directive('iterationImage', function (){
		return {
			restrict: 'EA',
			controller: function ($scope, $element){
				$scope.imageSize = {
					width: $element.width,
					height: $element.height
				}
			},
			link: function (scope, el, attrs){
					
			}
		}
	})