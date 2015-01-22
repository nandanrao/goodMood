angular.module('goodMood')
	.directive('mobileUpload', function ($cordovaCamera){
		return {
			restrict: 'E',
			templateUrl: 'iteration/mobileupload.html',
			controllerAs: 'mobileUpload',
			// replace: true,
			controller: function ($scope, $element){
				var pictureOptions;

				this.takePicture = function (){
					pictureOptions.sourceType = 1
					getPicture(pictureOptions)
				}

				this.uploadPicture = function (){
					pictureOptions.sourceType = 0
					getPicture(pictureOptions)
				}

				pictureOptions = {
					destinationType: 0,
					quality: 50,
					targetWidth: 1600,
					targetHeight: 1600
				}

				function getPicture (options){
					var pictureRecieved = $cordovaCamera.getPicture(pictureOptions)
					var imageData = pictureRecieved.then(function(datURI){
							return "data:image/jpeg;base64," + datURI
						})
					$scope.newIteration.createIteration(imageData)
				}
			}
		}
	})	