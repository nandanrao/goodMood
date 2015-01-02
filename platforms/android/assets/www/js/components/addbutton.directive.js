angular.module('goodMood')
	.directive('addButton', function (){
		return {
			restrict: 'A',
			// TODO: deal with image optimization!
			// TODO
			templateUrl: 'img/add-button2.svg'
		}
	})	