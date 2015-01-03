angular.module('goodMood')
	.controller('NewIterationCtrl', function($scope, $window, $log, $state, collaboration, $cordovaCamera, $ionicLoading, $ionicHistory, Iteration, Image){
		$scope.collaboration = collaboration;

		var pictureOptions = {
			destinationType: 0
		}

		this.cancel = function(){
			$ionicHistory.goBack()
		}

		this.getViewTitle = function(){
			if (collaboration.iterations && collaboration.iterations.length > 1){
				return 'nueva iteracion'
			}
			else {
				return 'agrega una imagen'
			}
		}

		this.isDesktop = function(){
			if (!window.cordova){
				return true
			}
			return false	
		}

		this.desktopUpload = function(file){
			console.log("uploaded file", file[0])
		}
		
		this.fromDevice = function(){
			pictureOptions.sourceType = 0
			getPicture(pictureOptions)
		}

		this.takePicture = function(){
			getPicture(pictureOptions)
		}

		function getPicture (options){
			var pictureRecieved = $cordovaCamera.getPicture(pictureOptions)
			$ionicLoading.show();
			pictureRecieved
				.then(function(datURI){
					$ionicLoading.show();
					return Image.create("data:image/jpeg;base64," + datURI)
				})
				.then(function(image){
					return Iteration.create({
						image: image,
						collaboration: collaboration
					})
				})
				.then(_.partialRight(collaboration.$addIteration.bind(collaboration)))
				.then(function(iteration){
					$state.go('^.iteration.view', {
						i_id: iteration.$id,
						c_id: collaboration.$id
					})
				})
				.catch(function(err){
					// TODO: this error message is silly when user cancels the action!
					$log.error('Error creating a picture for a new iteration')
					$window.alert('Sorry we had a problem! Try again?')
					$state.reload()
				})
		}
	})