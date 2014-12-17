angular.module('goodMood')
	.directive('iterationCanvas', function ($ionicGesture, $interval){
		return {
			restrict: 'A',
			link: function (scope, el, attrs){

				paper.setup(el[0]);
				var project = paper.project
				paper.view.draw();

				var tool = new paper.Tool();
				var counting;
				var circle;
				var position;

				// TODO: Fix numbers/math on animation. CLEAN UP!
				tool.onMouseDown = function(e){
					console.log("mousedown and view:", paper.view)
					console.log("projects", paper.projects)
					console.log('this views project', project)
					console.log('the currently active project', paper.project)
					console.log('all tools', paper.tools)
					console.log('currently active tool', paper.tool)
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
							console.log(paper.view.bounds)
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
				function createListener(gesture, el){
					var fn = function(e){
						scope.$emit(gesture)
					}
					var instance = $ionicGesture.on(gesture, fn, el)
					var remove = $ionicGesture.off(instance, gesture, fn).bind(null)
					return remove
				}

				var createListenerHere = _.partial(createListener, el)

				var listenerArray = [
					'swipedown', 
					'swipeup', 
					'swiperight'
				];

				var removers;
				scope.$on('$ionicView.enter', function(){
					removers = _.forEach(listenerArray, createListener.bind(null, el))
				})

				scope.$on('$ionicView.leave', function(){
					_.forEach(removers, Function.prototype.call)
				})
				
				scope.$on('$ionicView.beforeEnter', function(){
					project.activate()
					tool.activate()
				})

				scope.$on('$ionicView.unloaded', function(){
					tool.remove();
					project.remove();
				})
			}
		}
	}) 