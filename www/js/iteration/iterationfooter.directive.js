angular.module('goodMood')
	.directive('iterationFooter', function(){
		return {
			restrict: 'A',
			link: function(scope){
				console.log('iteration footer linking')
				scope.iterationFooter.exists = true;
			}
		}
	})