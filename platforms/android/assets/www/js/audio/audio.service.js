angular.module('goodMood')	
	.factory('Audio', function ($firebase, fb){
		var Audio = {};


		/**
		 * Creates a new audio class from a data uri
		 */
		Audio.create = function(data){
			var ref = fb.audio.push(data)
			return $firebase(ref).$asObject().$loaded()
		}

		/**
		 * Find an audio by its $id
		 * @returns a promise that resolves to an audio instance
		 */
		Audio.findById = function(id){
			var ref = fb.audio.child(id)
			return $firebase(ref).$asObject().$loaded()
		}

		return Audio
	})