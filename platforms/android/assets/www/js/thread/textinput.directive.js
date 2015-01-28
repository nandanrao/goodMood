angular.module('goodMood')
	.directive('threadTextInput', function (){
		return {
			restrict: 'A', 
			link: function (scope, el){
				scope.$watch('writing.currently', function (curr, old){
					if (curr === false && old){
						el[0].blur()
					}
				})
			}
		}
	})