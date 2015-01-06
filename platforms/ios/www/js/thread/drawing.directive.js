angular.module('goodMood')
	.directive('drawing', function ($state, Thread){
		return {
			restrict: 'E',
			link: function(scope, el, attrs){
				scope.imageLoaded.then(function(){
					var x = attrs.x*scope.imageSize.width
					var y = attrs.y*scope.imageSize.height
					var point = new paper.Point(x, y)

					// Created shape automatically appended to paperjs 'view'
					var shape = new paper.Path.Circle({
						center: point,
						fillColor: '#b6ff29',
						radius: 30,
						opacity: .75
					});

					// move position of circles on window resize!
					scope.$watchCollection('imageSize', function(curr){
						var x = attrs.x*curr.width
						var y = attrs.y*curr.height
						shape.position = new paper.Point(Number(x), Number(y))
					})

					// This is needed to update the view immediately!
					paper.view.update()

					// Click event for the shape
					shape.onClick = function(event){
						console.log('clicked!')
						$state.go('thread', {t_id: attrs.id})
					}

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
				})
			}
		}
	})