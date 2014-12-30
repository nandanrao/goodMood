angular.module('goodMood')
	.directive('iterationCanvas', function ($ionicGesture, $interval){
		return {
			restrict: 'A',
			controller: function ($scope){
				console.log('controllering')
			},
			link: function (scope, el, attrs){
				paper.setup(el[0]);
				var project = paper.project
				paper.view.draw();
				console.log('linking', paper.view._id, scope.imageSize)
				var tool = new paper.Tool();
				var counting;
				var circle;
				var position;

				// TODO: Fix numbers/math on animation. CLEAN UP!
				tool.onMouseDown = function(e){
					console.log('mousedown ')
					position = e.point;
					var i = 0;
					counting = $interval(function(){
						i++
						if (i === 2){
							drawCircle(position)	
							paper.view.onFrame = function(event){
								circle.opacity += .025
								circle.scale(.95)
							}
						}
						if (i === 8){
							paper.view.onFrame = angular.noop	
							// console.log(paper.view.bounds)
							// TODO: store bounds to deal with different frame size? 
							scope.$emit('addThread', {x: position.x, y: position.y})
						}
					}, 100, 8)
				}

				tool.onMouseDrag = function(e){
					position = e.point;
					moveCircle(e.point)
				}

				tool.onMouseUp = function(e){
					if (circle){
						circle.remove()
					}
					paper.view.onFrame = angular.noop
					circle = undefined;
					$interval.cancel(counting)
				}

				function drawCircle(point){
					circle = new paper.Path.Circle({
						center: point,
						fillColor: '#b6ff29',		
						radius: 250,
						opacity: 0,
					});
				}

				function moveCircle(point){
					if (circle){
						circle.position = point
					}
				}

				// Helper function to create ionicgesture listener -- move to utils?
				function createListener(gesture){
					var fn = function(e){
						scope.$emit(gesture)
					}
					var instance = $ionicGesture.on(gesture, fn, el)
					var remove = $ionicGesture.off.bind(null, instance, gesture, fn)
					return remove
				}

				var listenerArray = [
					'swipedown', 
					'swipeup', 
					'swiperight'
				];

				var removers;
				scope.$on('$ionicView.enter', function(){
					removers = _.map(listenerArray, createListener)
				})

				scope.$on('$ionicView.beforeLeave', function(){
					_.forEach(removers, function(fn){
						fn()
					})
				})
				
				scope.$on('$ionicView.beforeEnter', function(){
					console.log('beforeenter', project, tool)
					project.activate()
					tool.activate()
				})

				scope.$on('$ionicView.unloaded', function(){
					console.log("unloaded", project._view._id, project, tool)
					tool.remove();
					project.remove();
				})
			}
		}
	}) 