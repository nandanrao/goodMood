angular.module('goodMood')
	.directive('iterationCanvas', function ($ionicGesture, $interval, $window){
		return {
			restrict: 'A',
			link: function (scope, el, attrs){
				console.log('iteration id', scope.iteration.iteration$id)
				function resizeCanvas(){
					el[0].style.width = scope.imageSize.width + 'px';
					el[0].style.height = scope.imageSize.height + 'px';	
					el[0].style['margin-left'] = -scope.imageSize.width/2 + 'px';
					paper.view.setViewSize(el[0].clientWidth, el[0].clientHeight)
				}

				scope.$watchCollection('imageSize', function(imageSize){
					if (imageSize){
						resizeCanvas()	
					}
				})

				paper.setup(el[0]);
				paper.view.draw();
				
				var project = paper.project
				var tool = new paper.Tool();
				var counting,
						path,
						position,
						pathStart,
						count

					
				tool.onMouseDown = function(e){
					position = e.point;
					pathStart = position.add(new paper.Point(0,-50))
					count = -45;
					var i = 0;
					counting = $window.setInterval(function(){
						i++
						if (i === 2){
							startPath(position)	
							paper.view.onFrame = function(event){
								growPath()
							}
						}
						if (i === 8){
							console.log('-----8 count finished', Date.now())
							paper.view.onFrame = angular.noop	
							var x = position.x/paper.view.bounds.width
							var y = position.y/paper.view.bounds.height
							scope.iteration.addThread({x: x, y: y})
							$window.clearInterval(counting)
						}
					}, 100)
				}

				tool.onMouseDrag = function(e){
					// position = e.point;
					movePosition(e.point)
				}

				tool.onMouseUp = function(e){
					if (path){
						path.remove()
					}
					paper.view.onFrame = angular.noop
					path = undefined;
					$window.clearInterval(counting)
				}

				function startPath(position){
					path = new paper.Path()
					path.strokeColor = '#277FE9';
					path.strokeWidth = 15;
					path.opacity = .85;
				}

				
				function growPath(){
					var vector = new paper.Point({
						angle: count * 12,
						length: 50
					});
					var z = position.add(vector)
					path.add(z)
					pathStart = pathStart.add(vector);
					path.smooth()
					count++;
				}

				function movePosition(point){
					// TODO: move circle as mouse moves!
				}

				var testpoint = new paper.Point(20,20)
				var test2 = new paper.Point(10,10)
				console.log(testpoint + test2)


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
					// console.log('view enter')
					removers = _.map(listenerArray, createListener)
				})

				scope.$on('$ionicView.beforeLeave', function(){
					// console.log('view beforeleave')
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