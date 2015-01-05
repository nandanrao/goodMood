angular.module('goodMood')
	.directive('checkButton', function (){
		return {
			restrict: 'A',
			templateUrl: 'img/check-button.svg'
		}
	})