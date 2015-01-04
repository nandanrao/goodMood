angular.module('goodMood')
	.factory('Image', function (fb, $firebase){
	
		var Image = {};


		/**
		 * Creates a new image class from a data uri
		 */
		Image.create = function(data){
			var ref = fb.images.push(data)
			return $firebase(ref).$asObject().$loaded()
		}

		/**
		 * Find an image by its $id
		 * @returns a promise that resolves to an image instance
		 */
		Image.findById = function(id){
			var ref = fb.images.child(id)
			return $firebase(ref).$asObject().$loaded()
		}

		return Image;
	})


	// image factory

	// Image create takes nothing
	// image.addPhoto takes a fullsize dataURI and sets it to _file + full
	// then it runs image.$createBaseSizes (resizes to one or two?)
	// this spawns a web worker that resizes the images, and adds them to the instance
	// we also want an image.$resize -- which just calls the imageresize service with itself
	// we create an $getCorrectSize which runs image.$resize based on the device size
	// this maybe also adds a listener for window resizes? 
	// if so, make sure to kill the listener on $destroy!

