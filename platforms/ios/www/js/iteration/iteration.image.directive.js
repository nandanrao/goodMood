angular.module('goodMood')	
	.directive('iterationImage', function ($window, $document, $q, $timeout){
		return {
			restrict: 'A',
			link: function (scope, element, attrs){
				// Set imageSize on scope only when image has loaded.
				// This acts as a sortof promise to tell the canvas and drawings
				// that they can start drawing themselves.
				element.bind('load', function() {
					$timeout(function(){
						scope.$watchCollection('iterationFooter', function(){
							setImageSize()
						});
					})
			  });	

				// Set a listener for window onresize to adjust the image size
				$win = angular.element($window)
				$win.on('resize', setImageSize)
				element.on('$destroy', function(){
					$win.off('resize', setImageSize)
				});

				// The function that puts or updates the imageSize object
				function setImageSize() {
					$window.requestAnimationFrame(function(){
						scope.imageSize.width = element[0].clientWidth;
						scope.imageSize.height = element[0].clientHeight;
						console.log('setting image size', scope.imageSize.height)
						element[0].style['margin-left'] = -scope.imageSize.width/2 + 'px'	;
						element[0].style.visibility = 'visible';
						scope.$apply()
					})
				};
			}
		}
	})