angular.module('goodMood')	
	.directive('iterationImage', function ($window, $document, $q, $timeout){
		return {
			restrict: 'A',
			link: function (scope, element, attrs){
				scope.imageSize.resize = setImageSize

				// Set imageSize on scope only when image has loaded.
				element.bind('load', function() {
					// note: loaded MUST come before resize!
					scope.imageSize.loaded = true;
					setImageSize()
			  });	

				// Set a listener for window onresize to adjust the image size
				$win = angular.element($window)
				$win.on('resize', setImageSize)
				element.on('$destroy', function(){
					$win.off('resize', setImageSize)
				});

				// The function that puts or updates the imageSize object
				function setImageSize() {
					if (!scope.imageSize.loaded || !scope.active){
						return
					}
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