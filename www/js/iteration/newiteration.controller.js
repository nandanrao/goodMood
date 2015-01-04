angular.module('goodMood')
	.controller('NewIterationCtrl', function($scope, $q, $window, $log, $state, collaboration, $cordovaCamera, $ionicLoading, $ionicHistory, utils, Iteration, Image){
		var vm = this;
		this.isDesktop = utils.isDesktop


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

		this.createIteration = function(imageDataLoaded){
			$ionicLoading.show();

			var image, DataURI;
			var imageCreated = Image.create(false)

	    $q.all({
	    	image: imageCreated,
	    	dataURI: imageDataLoaded
	    })
    	.then(function(results){
    		console.log('imageread and imagecreated', Date.now())
    		dataURI = results.dataURI;
    		image = results.image;
    		return Iteration.create({
    			image: results.image,
    			collaboration: collaboration
    		})
	    })
	    .then(_.partialRight(collaboration.$addIteration.bind(collaboration)))
	    .then(function(iteration){
	    	console.log('update image inst', Date.now())
	    	image.$inst().$set(dataURI).then(function(obj){
	    		console.log('image saved', Date.now())
	    	})
	    	console.log('state go iteration view', Date.now())
	    	$state.go('iteration', {
	    		i_id: iteration.$id,
	    		c_id: collaboration.$id
	    	})
	    	$ionicLoading.hide()
	    })
    	.catch(function(err){
    		// TODO: this error message is silly when user cancels the action!
    		$log.error('Error creating a picture for a new iteration')
    		$window.alert('Sorry we had a problem! Try again?')
    		$state.reload()
    	})
		}

		var pictureOptions = {
			destinationType: 0,
			quality: 50,
			targetWidth: 2048,
			targetHeight: 2048
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
			var imageData = pictureRecieved.then(function(datURI){
				console.log('got data from cordovaCamera')
					return "data:image/jpeg;base64," + datURI
				})
			vm.createIteration(imageData)
		}
	})