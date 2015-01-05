angular.module('goodMood')	
	.directive('iterationImage', function ($window){
		return {
			restrict: 'EA',
			controller: function ($scope, $element){

			},
			link: function (scope, element, attrs){
				element.ready(function(){
					setImageSize()
				})

				$win = angular.element($window)
				$win.on('resize', setImageSize)
				element.on('$destroy', function(){
					$win.off('resize', setImageSize)
				})

				function setImageSize() {

					scope.imageSize = {
						width: element[0].clientWidth,
						height: element[0].clientHeight
					}
					element[0].style['margin-left'] = -scope.imageSize.width/2 + 'px'
					scope.$apply();
				}
			}
		}
	})