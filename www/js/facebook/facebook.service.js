angular.module('goodMood')
	.factory('Facebook', function($q, $cordovaFacebook){
		
		var Facebook = {};

		Facebook.getToken = function(){
			return $cordovaFacebook.login(["public_profile", "email"])
				.then(function(obj){
					return obj.authResponse.accessToken
				})
		}
		
		Facebook.getPicture = function(){
		return $cordovaFacebook.api('/me/picture')
	    .then(function(success) {
	      return success
	    });
	  }

		return Facebook
	})