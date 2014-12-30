angular.module('goodMood')
	.directive('addButton', function (){
		return {
			restrict: 'A',
			// TODO: deal with image optimization!
			templateUrl: 'img/add-button.svg'
		}
	})	