angular.module('goodMood')
	.directive('addButton', function (){
		return {
			restrict: 'E',
			replace: true,
			// TODO: deal with image optimization!
			templateUrl: 'img/add-button.svg'
		}
	})	