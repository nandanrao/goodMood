angular.module('goodMood')
	.directive('drawing', function ($state, $timeout, Thread){
		return {
			restrict: 'E',
			link: function(scope, el, attrs){
				console.log('drawing linking', Date.now())
				var textItem;

				var x = scope.thread.drawing.x;
				var y = scope.thread.drawing.y;

				pX = x*scope.imageSize.width
				pY = y*scope.imageSize.height
				var point = new paper.Point(pX, pY)

				// Created shape automatically appended to paperjs 'view'
				var shape = new paper.Path.Circle({
					center: point,
					fillColor: '#b6ff29',
					radius: 30,
					opacity: .75
				});

				// move position of circles on window resize!
				scope.$watchCollection('imageSize', function(curr){
					var pX = x*curr.width;
					var pY = y*curr.height;
					var point = new paper.Point(pX,pY);
					shape.position = point;
					textItem.position = point;
					paper.view.update()
				})

				textItem = new paper.PointText(point);
				textItem.fillColor = '#277FE9';
				textItem.justification = 'center';
				textItem.fontFamily = 'Futura-Bold';
				textItem.fontSize = '26px';
				textItem.content = ''

				// This is needed to update the view immediately!
				paper.view.update()

				// Click event for the shape
				shape.onClick = function(event){
					$state.go('thread', {t_id: attrs.id})
				}
				textItem.onClick = function(event){
					$state.go('thread', {t_id: attrs.id})
				}

				Thread.getNewMessagesAsStream(attrs.id).onValue(function(val){
					var num = _.size(val)
					textItem.content = num > 0 ? num : ''
					if (paper && paper.view){
						paper.view.update()	
					}
				})	

				// Remove the $firebase listeners to free up memory/prevent callbacks
				scope.thread.$destroy()						
				
				// Remove the shape, with its listeners, on dom removal,
				// this allows the elements to react to server-side data events
				el.on('$destroy', function(){
					if (shape.view){
						shape.remove()	
						paper.view.update()
					}
				})
				
				
				// TODO: this is tightly coupled with scope relationship -- somehow fix? 
				scope.$parent.$on('$ionicView.enter', function(){
					Thread.getNewMessagesAsStream(attrs.id).onValue(function(val){
						var num = _.size(val)
						if (num === textItem.content){
							return
						}
						textItem.content = num > 0 ? num : ''
						if (paper && paper.view){
							paper.view.update()	
						}	
					})
				})
			}
		}
	})