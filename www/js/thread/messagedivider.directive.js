angular.module('goodMood')
	.directive('messageDivider', function (utils, Auth){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'img/message-divider.svg'
		}
	})