angular.module('goodMood')
	.factory('Facebook', function($q, $cordovaFacebook){
		
		var Facebook = {};

		Facebook.getToken = function(){
			return Facebook.getLoginStatus().then(function(response){
			  if (response.status === 'connected'){
			    return response.authResponse.accessToken
			  }
			  else if (response.status === ''){
					return $cordovaFacebook.login(["public_profile", "email"])
						.then(function(obj){
							return obj.authResponse.accessToken
						})  	
			  }
			})
		}
		
		Facebook.getPicture = function(){
			return $cordovaFacebook.api('/me/picture')
	  }

	  Facebook.getLoginStatus = function(){
	  	return $cordovaFacebook.getLoginStatus()
	  }

	  Facebook.logout = function(){
	  	return $cordovaFacebook.logout()
	  }

		return Facebook
	})