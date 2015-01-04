angular.module('goodMood')
	.directive('drawing', function ($state, Thread){
		return {
			restrict: 'E',
			link: function(scope, el, attrs){

				var point = new paper.Point(Number(attrs.x), Number(attrs.y))

				// Created shape automatically appended to paperjs 'view'
				var shape = new paper.Path.Circle({
					center: point,
					fillColor: '#b6ff29',
					radius: 30,
					opacity: .75
				});

				// console.log(paper.view.bounds)
				// This is needed to update the view immediately!
				paper.view.update()

				// Click event for the shape
				shape.onClick = function(event){
					console.log('clicked!')
					$state.go('thread', {t_id: attrs.id})
				}

				// console.log(scope.imageSize)

				var textItem = new paper.PointText(point);
				textItem.fillColor = '#277FE9';
				textItem.justification = 'center';
				textItem.fontFamily = 'Futura-Bold';
				textItem.fontSize = '22px';

				Thread.getNewMessagesAsStream(attrs.id).onValue(function(val){
					var num = _.size(val)
					if (num > 0){
						textItem.content = num
					}
					else {
						textItem.content = ''
					}
					paper.view.update()
				})

				// Remove the shape, with its listeners, on dom removal,
				// this allows the elements to react to server-side data events
				el.on('$destroy', function(){
					if (shape.view){
						shape.remove()	
						paper.view.update()
					}
				})
			}
		}
	})