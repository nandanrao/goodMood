angular.module('goodMood')
	.directive('drawing', function ($state){
		return {
			restrict: 'E',
			controllerAs: 'drawing',
			
			controller: function(){

			},
			link: function(scope, el, attrs, ctrl){
				var shape = new paper.Path.Circle({
					center: new paper.Point(Number(attrs.x), Number(attrs.y)),
					fillColor: '#3399ff',
					strokeColor: '#999',
					strokeWidth: 10,
					radius: 25,
					opacity: 0.5
				});
				el.append(shape.exportSVG())
				// console.log(ctrl)
				shape.onClick = function(event){
					$state.go('thread', {t_id: attrs.id})
				}
				// TODO: test this cleanup function!
				el.on('$destroy', function(){
					shape.remove()
				})
			}
		}
	})