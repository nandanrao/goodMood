angular.module('goodMood')
	.directive('iterationCanvas', function ($ionicGesture, $interval){
		return {
			restrict: 'A',
			link: function (scope, el, attrs){
				paper.setup(el[0]);
				paper.view.draw();

				var tool = new paper.Tool();
				var counting;
				var circle;
				var position;

				// TODO: Fix numbers/math on animation. CLEAN UP!
				tool.onMouseDown = function(e){	
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

				// $ionicGesture.on('hold', function(e){
				// 	var x = e.gesture.center.pageX
				// 	var y = e.gesture.center.pageY
				// 	scope.$emit('addThread', {x:x, y:y})
				// }, el)

				$ionicGesture.on('swipedown', function(e){
					console.log('swipedown')
					scope.$emit('swipedown')
				}, el)

				$ionicGesture.on('swipeup', function(e){
					console.log('swipeup')
					scope.$emit('swipeup')
				}, el)

				$ionicGesture.on('swiperight', function(e){
					console.log('swipe right!')
					scope.$emit('swipeup')
				}, el)


			}
		}
	}) 