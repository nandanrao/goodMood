angular.module('goodMood')
	.directive('desktopUpload', function ($q, $state, Image, Iteration){
		return {
			restrict: 'E',
			templateUrl: 'iteration/desktopupload.html',
			controllerAs: 'desktopUpload',
			controller: function ($scope, $element){
			var image, DataURI;

				this.selectFile = function(e){
					var imageCreated = Image.create(false)
					var imageRead = $q.defer()

					var file = e.srcElement.files[0]
					var reader = new FileReader();
					reader.onload = function(e) {
						console.log('imageread', Date.now()) 
						imageRead.resolve(e.target.result) 
					}
			    reader.readAsDataURL(file);
			    $q.all({
			    	image: imageCreated,
			    	dataURI: imageRead.promise
			    })
		    	.then(function(results){
		    		console.log('imageread and imagecreated', Date.now())
		    		dataURI = results.dataURI;
		    		image = results.image;
		    		return Iteration.create({
		    			image: results.image,
		    			collaboration: $scope.collaboration
		    		})
			    })
			    .then(_.partialRight($scope.collaboration.$addIteration.bind($scope.collaboration)))
			    .then(function(iteration){
			    	console.log('state go iteration view', Date.now())
			    	image.$inst().$set(dataURI).then(function(obj){
			    		console.log('image saved', Date.now())
			    	})

			    	$state.go('^.iteration.view', {
			    		i_id: iteration.$id,
			    		c_id: $scope.collaboration.$id
			    	})
			    })
		    	.catch(function(err){
		    		console.log('ERRA', err)
		    	})
				}

			},
			link: function (scope, el, attrs){
				scope.fileInput.onchange = scope.desktopUpload.selectFile;
				scope.fileInput.accept = 'image/*';
			}
		}
	})	