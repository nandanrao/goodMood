angular.module('goodMood')
	.directive('threadTextInput', function (){
		return {
			restrict: 'A', 
			link: function (scope, el){
				//el.on() key enter => el.blur()?
				scope.$watch('writing.currently', function (curr){
					if (curr === false){
						el.blur()
					}
				})
			}
		}
	})