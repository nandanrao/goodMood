angular.module('goodMood')
	.controller('NewIterationCtrl', function($scope, $q, $window, $log, $state, collaboration, $cordovaCamera, $ionicLoading, $ionicHistory, utils, Iteration, Picture){
		var vm = this;
		this.isDesktop = utils.isDesktop

		this.cancel = function(){
			$ionicHistory.goBack()
		}

		this.getViewTitle = function(){
			if (collaboration.iterations && _.size(collaboration.iterations) > 1){
				return 'nueva iteracion'
			}
			else {
				return 'agrega una imagen'
			}
		}

		this.createIteration = function(imageDataLoaded){
			$ionicLoading.show();
			var image, DataURI;
			var imageCreated = Picture.create()
	    $q.all({
	    	image: imageCreated,
	    	dataURI: imageDataLoaded
	    })
    	.then(function(results){
    		dataURI = results.dataURI;
    		image = results.image;
    		image.$addImage(dataURI).then(function(obj){
    			console.log('image saved', Date.now())
    		})
    		return Iteration.create({
    			image: results.image,
    			collaboration: collaboration
    		})
	    })
	    .then(_.partialRight(collaboration.$addIteration.bind(collaboration)))
	    .then(function(iteration){
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
    		$ionicLoading.hide()
    	})
		}
		
		$ionicLoading.hide()
	})