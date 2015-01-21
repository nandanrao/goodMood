angular.module('goodMood')	
	.directive('iterationImage', function ($window, $document, $q){
		return {
			restrict: 'A',
			link: function (scope, element, attrs){
				// Set imageSize on scope only when image has loaded.
				// This acts as a sortof promise to tell the canvas and drawings
				// that they can start drawing themselves.
				element.bind('load', function() {
					setImageSize()
					element[0].style.visibility = 'visible';
			  });	

				// // When the view is cached we need this event to set image size
				// scope.$on('$ionicView.enter', function(){
				// 	console.log('iniocviewentered')
				// 	// setImageSize()
				// 	// scope.$apply()
				// })

				// Set a listener for window onresize to adjust the image size
				$win = angular.element($window)
				$win.on('resize', setImageSize)
				element.on('$destroy', function(){
					$win.off('resize', setImageSize)
				})

				// The function that puts or updates the imageSize object
				function setImageSize() {
					scope.$evalAsync(function(){
						scope.imageSize.width = element[0].clientWidth;
						scope.imageSize.height = element[0].clientHeight;
						$window.requestAnimationFrame(function(){
							element[0].style['margin-left'] = -scope.imageSize.width/2 + 'px'	
						})
					})
				}
			}
		}
	})