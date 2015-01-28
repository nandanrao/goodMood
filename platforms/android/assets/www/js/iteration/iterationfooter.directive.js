angular.module('goodMood')
	.directive('iterationFooter', function(){
		return {
			restrict: 'A',
			link: function(scope, el){
				console.log('iteration footer linking', Date.now())
				el.ready(function(){
					console.log('iteration footer element loaded', Date.now())
					scope.iterationFooter.exists = true;
				})
			}
		}
	})