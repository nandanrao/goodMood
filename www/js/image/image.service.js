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