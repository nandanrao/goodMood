angular.module('goodMood')
	.directive('desktopUpload', function ($q, $state, Picture, Iteration){
		return {
			restrict: 'E',
			templateUrl: 'iteration/desktopupload.html',
			controllerAs: 'desktopUpload',
			controller: function ($scope, $element){
			

			this.selectFile = function(e){
				var imageRead = $q.defer()
				$scope.newIteration.createIteration(imageRead.promise)
				var file = e.srcElement.files[0]
				var reader = new FileReader();
				reader.onload = function(e) {
					imageRead.resolve(e.target.result) 
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