angular.module('goodMood')
	.directive('voiceMessageLine', function ($window){
		return {
			restrict: 'A',
			controllerAs: 'voiceMessageLine',
			link: function (scope, el){
				scope.playLine = el[0]
			}
		}
	})