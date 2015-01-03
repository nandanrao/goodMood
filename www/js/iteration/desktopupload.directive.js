angular.module('goodMood')
	.directive('desktopUpload', function (Image){
		return {
			restrict: 'E',
			templateUrl: 'iteration/desktopupload.html',
			controllerAs: 'desktopUpload',
			controller: function ($scope, $element){

				this.selectFile = function(e){
					var file = e.srcElement.files[0]
					var reader = new FileReader();
					reader.onload = function(e) { 
						console.log(e.target.result) 
					}
			    reader.readAsDataURL(file);	
				}
			},
			link: function (scope, el, attrs){
				scope.fileInput.onchange = scope.desktopUpload.selectFile;
				scope.fileInput.accept = 'image/*';
			}
		}
	})	