angular.module('goodMood')
	.controller('NewIterationCtrl', function($scope, $window, $log, $state, collaboration, $cordovaCamera, $ionicLoading, Iteration, Image){

		var pictureOptions = {
			destinationType: 0
		}

		this.getViewTitle = function(){
			if (collaboration.iterations.length > 1){
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
					return Image.create(datURI)
				})
				.then(function(image){
					return Iteration.create({
						image: image,
						collaboration: collaboration
					})
				})
				.then(_.partialRight(collaboration.$addIteration.bind(collaboration)))
				.then(function(iteration){16
					$state.go('^.iteration.view', {
						i_id: iteration.$id,
						c_id: collaboration.$id
					})
				})
				.catch(function(err){
					$log.error('Error creating a picture for a new iteration')
					$window.alert('Sorry we had a problem! Try again?')
				})
		}
	})