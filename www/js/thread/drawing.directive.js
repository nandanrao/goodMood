angular.module('goodMood')
	.directive('drawing', function ($state){
		return {
			restrict: 'E',
			link: function(scope, el, attrs, ctrl){

				// Created shape automatically appended to paperjs 'view'
				var shape = new paper.Path.Circle({
					center: new paper.Point(Number(attrs.x), Number(attrs.y)),
					fillColor: '#3399ff',
					strokeColor: '#999',
					strokeWidth: 10,
					radius: 25,
					opacity: 0.5
				});

				// This is needed to update the view immediately!
				paper.view.update()

				// Click event for the shape
				shape.onClick = function(event){
					console.log('clicked!')
					$state.go('^.^.thread', {t_id: attrs.id})
				}

				// Remove the shape, with its listeners, on dom removal,
				// this allows the elements to react to server-side data events
				el.on('$destroy', function(){
					console.log("drawing element destroyed")
					shape.remove()
				})
			}
		}
	})