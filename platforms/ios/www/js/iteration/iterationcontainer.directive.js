angular.module('goodMood')
	.directive('iterationContainer', function (){
		return {
			restrict: 'A',
			link: function (scope, el, attrs){
				// var height = el[0].clientHeight
				// console.log('height', scope.imageRatio)
				// scope.imageSize.height = height;
				// scope.imageSize.width = height * scope.imageRatio
				// console.log('iteration container linked', Date.now())
			}
		}
	})