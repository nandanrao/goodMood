angular.module('goodMood')
	.directive('fileInput', function (){
		return {
			restrict: 'E',
			replace: true,
			template: '<input type="file">', 
			link: function (scope, el, attrs){
				scope.fileInput = el[0];
				scope.fileInputClick = function(){
					el[0].click();	
				}
			}
		}
	})	