angular.module('goodMood')
	.factory('Facebook', function($q){
		
		var Facebook = {};

		Facebook.login = function(){
			return $cordovaFacebook.getAccessToken()
		}
		
		Facebook.getPicture = function(){
			
		return $cordovaFacebook.api('/me/picture')
		    .then(function(success) {
		      return success
		    });

		return Facebook
	})