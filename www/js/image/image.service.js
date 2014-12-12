angular.module('goodMood')
	.factory('Image', function (fb, $firebase){
	
		var Image = {};


		/**
		 * Creates a new image class from a data uri
		*/
		Image.create = function(data){
			var ref = fb.images.push(data)
			var obj = $firebase(ref).$asObject().$loaded()
			return obj;
		}

		return Image;
	})