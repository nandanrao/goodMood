angular.module('goodMood')	
	.factory('IterationSurface', function ($window){
		var IterationSurface = {}

		function Surface (){};

		Surface.prototype.resize = function (w, h){
			paper.view.setViewSize(w, h)
		};

		Surface.prototype.activate = function (){
			this.project.activate()
			this.tool.activate()
		};

		Surface.prototype.destroy = function (){
			this.tool.remove();
			this.project.remove();
		};

		IterationSurface.create = function (canvas, addThread){
			paper.setup(canvas);
			paper.view.draw();

			var surface = new Surface();
			surface.project = paper.project
			surface.tool = new paper.Tool();

			var counting,
					path,
					position,
					pathStart,
					count

			surface.tool.onMouseDown = function(e){
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
						paper.view.onFrame = angular.noop	
						var x = position.x/paper.view.bounds.width
						var y = position.y/paper.view.bounds.height
						addThread({x: x, y: y})
						$window.clearInterval(counting)
					}
				}, 100)
			}

			surface.tool.onMouseDrag = function(e){
				// position = e.point;
				movePosition(e.point)
			}

			surface.tool.onMouseUp = function(e){
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

			return surface;
		}

		return IterationSurface
	})