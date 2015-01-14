angular.module('goodMood')
	.factory('Picture', function ($q, fb, $firebase, $timeout, $FirebaseObject, imageResize, utils){
	
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
				this.image = true;

				// Set original data!
				var imageDataId = utils.uuid()
				var imageUploaded = $firebase(fb.imageData).$set(imageDataId, dataURI)
				this.original = imageDataId;

				// Calculate and set dimensions
				var dimensions = Picture.calculateDimensions(dataURI);
				this.height = dimensions.height;
				this.width = dimensions.width;

				// Save these so they're available synchronously
				this.$save()

				// Wrap this in setTimeout to run on next tick 
				// as it does not need to be synchronous
				var imageSetCreated = $q.defer()
				$timeout(function(){
					Picture.createSmall(dataURI).then(function(s_id){
						self.small = s_id;
						return self.$getSmall()
					})
					.then(function(small){
						return Picture.createThumbnail(small)
					})
					.then(function(t_id){
						self.thumbnail = t_id;
						imageSetCreated.resolve()
					})
					.catch(function(err){
						imageSetCreated.reject(err)
					})
				},0)
				
				// resolves to itself when the data is saved to the server?
				return $q.all([
					imageUploaded,
					imageSetCreated.promise
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
					return this.$getOriginal()
				}
				return getImageData(this.thumbnail)
			},

			$getOriginal: function(){
				if (!this.original){
					throw new Error('trying to get image data before original is set!')
				}
				return getImageData(this.original)
			},

			$getSmall: function(){
				if (!this.small) {
					return this.$getOriginal()
				}
				return getImageData(this.small)
			}
		})

		// Helper function to get dataURI for an image with a given imageData ID.
		function getImageData(id){
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

