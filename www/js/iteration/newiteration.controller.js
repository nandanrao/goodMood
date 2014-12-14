angular.module('goodMood')
	.controller('NewIterationCtrl', function($scope, $window, $log, $state, collaboration, $cordovaCamera, Iteration, Image){

		var pictureOptions = {
			destinationType: 0
		}

		if (!window.cordova){
			console.log('notta device')
		}

		this.fromDevice = function(){
			pictureOptions.sourceType = 0
			getPicture(pictureOptions)
		}

		this.takePicture = function(){
			getPicture(pictureOptions)
		}

		function getPicture (options){
			$cordovaCamera.getPicture(pictureOptions)
				// Start a loading screen here? 
				.then(Image.create)
				.then(function(image){
					return Iteration.create({
						image: image,
						collaboration: collaboration
					})
				})
				.then(_.partialRight(collaboration.$addIteration.bind(collaboration)))
				.then(function(iteration){16
					$state.go('^.iteration', {
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