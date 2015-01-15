angular.module('goodMood')
	.directive('drawing', function ($state, $timeout, Thread, DrawingFactory){
		return {
			restrict: 'E',
			link: function(scope, el, attrs){
				// console.log('drawing linking', Date.now())
				var drawing = DrawingFactory.create(scope.thread, scope.imageSize)
				scope.canvasElements.drawings.push(drawing)

				// Remove the $firebase listeners to free up memory/prevent callbacks
				scope.thread.$destroy()						

				// move position of circles on window resize!
				scope.$watchCollection('imageSize', function(imageSize){
					drawing.resize(imageSize.width, imageSize.height)
				})
				
				// Remove the shape, with its listeners, on dom removal,
				// this allows the elements to react to server-side data events
				el.on('$destroy', function(){
					drawing.destroy()
				})
			}
		}
	})