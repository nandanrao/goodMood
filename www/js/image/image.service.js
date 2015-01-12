angular.module('goodMood')
	.factory('Picture', function ($q, fb, $firebase, $FirebaseObject, imageResize){
	
		var Picture = {};

		Picture.ref = fb.images;

		var PictureFactory = $FirebaseObject.$extendFactory({

			/**
			 *	Adds an image to a picture instance
			 * 	@param {string} the dataURI of the image to add
			 *  @returns promise that resolves when image is saved and metadata updated
			 */
			$addImage: function (dataURI){
				if (!dataURI || typeof dataURI !== 'string'){
					throw new Error('not')
				}
				var self = this;

				// Set the newly taken data to be used immediately
				this._original = dataURI;
				this.image = true;

				// Calculate and set dimensions
				var dimensions = Picture.calculateDimensions(dataURI);
				this.height = dimensions.height;
				this.width = dimensions.width;

				// Upload the information to the server
				var imageUploaded = Picture.saveImageData(dataURI).then(function(id){
					// console.log('hey')
					self.original = id;
					return
				});

				var imageSetCreated = Picture.createSmall(dataURI).then(function(s_id){
					// console.log('hey')
					self.small = s_id;
					return self.$getSmall()
				})
				.then(function(small){
					return Picture.createThumbnail(small)
				})
				.then(function(t_id){
					self.thumbnail = t_id;
					return
				})
				
				// resolves to itself when the data is saved to the server?
				return $q.all([
					imageUploaded,
					imageSetCreated
				])
				.then(function (ref){
					self.$save()
				})
				.then(function(){
					return self
				})
			},

			$getThumbnail: function(){
				if (!this.thumbnail) {
					// return original? 
				}
				return getImageData(this.thumbnail)
			},

			$getOriginal: function(){
				return getImageData(this.original)
			},

			$getSmall: function(){
				if (!this.small) {
					console.log(this)
					return $q.when(this._original)
				}
				return getImageData(this.small)
			}

		})

		// Helper function to get imageData for a given ID
		function getImageData(id){
			console.log(id)
			var defer = $q.defer()
			fb.imageData.child(id).on('value', function(snap){
				defer.resolve(snap.val())
			})
			return defer.promise
		}

		/**
		 * 	Calculates the size of image data.
		 * 	Returns primitives, so image should be garbage collected
		 */
		Picture.calculateDimensions = function (dataURI){
		 	var i = new Image;
		 	i.src = dataURI;
		 	return {
		 		width: i.naturalWidth,
		 		height: i.naturalHeight
		 	}
		}

		/**
		 * 	Resizes an image to 800px
		 */
		Picture.createSmall = function (dataURI){
			return imageResize.resize(dataURI, 800).then(function(uri){
				console.log('hey')
				return Picture.saveImageData(uri)
			})
		}	

		/**
		 * 	Resizes an image to 400px
		 */
		Picture.createThumbnail = function (dataURI){
			return imageResize.resize(dataURI, 400).then(function(uri){
				return Picture.saveImageData(uri)
			})
		}	

		/**
		 * 	Calculates the size of image data.
		 * 	Returns primitives, so image should be garbage collected
		 */
		Picture.saveImageData = function (dataURI){
			// console.log('hey')
			return $firebase(fb.imageData).$push(dataURI).then(function (ref){
				return ref.key()
			})
		}		

		/**
		 * 	Creates a new Picture class
		 * 	note: takes no arguments!
		 */
		Picture.create = function(){
			if (arguments.length > 0){
				throw new Error('no arguments for image creation!')
			}
			var ref = fb.images.push({
				image: false 
			})
			return $firebase(ref, {objectFactory: PictureFactory}).$asObject().$loaded()
		}

		/**
		 * 	Find an Picture by its $id
		 * 	@returns a promise that resolves to an Picture instance
		 */
		Picture.findById = function(id){
			var ref = fb.images.child(id)
			return $firebase(ref, {objectFactory: PictureFactory}).$asObject().$loaded()
		}

		return Picture;
	})


	// Picture factory

	// Picture create takes nothing
	// image.addPhoto takes a fullsize dataURI and sets it to _original + original
	// then it runs image.$createBaseSizes (resizes to one or two?)
	// this spawns a web worker that resizes the images, and adds them to the instance
	// we also want an image.$resize -- which just calls the imageresize service with itself
	// we create an $getCorrectSize which runs image.$resize based on the device size
	// this maybe also adds a listener for window resizes? 
	// if so, make sure to kill the listener on $destroy!

