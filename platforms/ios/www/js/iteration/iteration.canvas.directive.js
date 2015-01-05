angular.module('goodMood')
	.directive('iterationCanvas', function ($ionicGesture, $interval){
		return {
			restrict: 'A',
			link: function (scope, el, attrs){

				function resizeCanvas(){
					el[0].style.width = scope.imageSize.width + 'px';
					el[0].style.height = scope.imageSize.height + 'px';	
					el[0].style['margin-left'] = -scope.imageSize.width/2 + 'px';
					// resize paperJS view
					paper.view.setViewSize(el[0].clientWidth, el[0].clientHeight)
				}

				scope.$watchCollection('imageSize', function(curr){
					resizeCanvas()
				})
				 
				paper.setup(el[0]);
				paper.view.draw();
				resizeCanvas()
				
				var project = paper.project
				var tool = new paper.Tool();
				var counting;
				var circle;
				var position;

				paper.view.onResize = function(a,b){
					console.log('resize,', a, b)
				}

				// TODO: Fix numbers/math on animation. CLEAN UP!
				tool.onMouseDown = function(e){
					console.log('bounds', paper.view.bounds)
					console.log('pixelRatio', paper.view.pixelRatio)
					console.log('size', paper.view.viewSize)
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
							var x = position.x/paper.view.bounds.width
							var y = position.y/paper.view.bounds.height
							console.log('add thread!', x, y)
							console.log('iteration controller?', scope.iteration)
							// TODO: store bounds to deal with different frame size? 
							scope.iteration.addThread({x: x, y: y})
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
					// console.log('beforeenter', project, tool)
					project.activate()
					tool.activate()
				})

				scope.$on('$ionicView.unloaded', function(){
					// console.log("unloaded", project._view._id, project, tool)
					tool.remove();
					project.remove();
				})
			}
		}
	}) 