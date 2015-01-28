angular.module('goodMood')
	.directive('iterationCanvas', function ($ionicGesture, $interval, $window, IterationSurface){
		return {
			restrict: 'A',
			link: function (scope, el, attrs){

				scope.canvasElements.surface = IterationSurface.create(el[0], scope.iteration.addThread)

				scope.$watchCollection('imageSize', function surfaceWatchImageSize (imageSize){
					resizeCanvas()	
				})
	
				function resizeCanvas(){
					el[0].style.width = scope.imageSize.width + 'px';
					el[0].width = scope.imageSize.width;
					el[0].style.height = scope.imageSize.height + 'px';	
					el[0].height = scope.imageSize.height;	
					el[0].style['margin-left'] = -scope.imageSize.width/2 + 'px';
					scope.canvasElements.surface.resize(el[0].clientWidth, el[0].clientHeight)
				}
			}
		}
	}) 