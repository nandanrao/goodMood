angular.module('goodMood')
	.directive('recordLight', function (){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'thread/record-light.html'
		}
	})