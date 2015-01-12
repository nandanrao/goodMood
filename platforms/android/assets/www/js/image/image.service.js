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
				var imageUploaded = Picture.saveImageData(dataURI);
				var metadataSaved = this.$save();
				// var thumbnailCreated = Picture.createThumbnail(dataURI);
				
				// resolves to itself when the data is saved to the server?
				return $q.all([imageUploaded, metadataSaved]).then(function (ref){
					return self;
				})
			},

			$loadThumbnail: function(){
				var self = this;
				this.$getThumbnail().then(function(dataURI){
					self._thumbnail	
				})
			},

			$getThumbnail: function(){
				if(!this.thumbnail){
					// get original and make one??
				}
				var defer = $q.defer()
				var id = this.thumbnail;
				fb.imageData.child(id).on('value', function(snap){
					defer.resolve(snap.val())
				})
				return defer.promise
			},

			$getOriginal: function(){
				var defer = $q.defer()
				var id = this.original;
				fb.imageData.child(id).on('value', function(snap){
					defer.resolve(snap.val())
				})
				return defer.promise
			}
		})

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
		 * 	Resizes an image to 400px
		 */
		Picture.createThumbnail = function (dataURI){
			var i = new Image;
			i.src = dataURI;
			var tW = 200;
			var tH = Math.floor(i.naturalHeight/i.naturalWidth*tW)
			var el = angular.element(i)
			return imageResize.resizeStep(i, tW, tH)
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

