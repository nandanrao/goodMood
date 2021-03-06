angular.module('goodMood')
	.factory('Facebook', function($q, $cordovaFacebook){


		
			
		var Facebook = {};

		Facebook.getToken = function(){
			// hack to work with current busted ngCordova
			// fix after patch!
			if (!window.cordova){
				facebookConnectPlugin.browserInit(759883230731625);	
			}
			return Facebook.getLoginStatus().then(function(response){
			  if (response.status === 'connected'){
			    return response.authResponse.accessToken
			  }
			  else if (response.status === '' || response.status === 'unknown'){
					return $cordovaFacebook.login(["public_profile", "email"])
						.then(function(obj){
							return obj.authResponse.accessToken
						})  	
			  }
			})
		}
		
		Facebook.getPicture = function(){
			return $cordovaFacebook.api('me?fields=picture.type(large)').then(function(obj){
				return obj.picture.data.url
			})
	  }

	  Facebook.getLoginStatus = function(){
	  	return $cordovaFacebook.getLoginStatus()
	  }

	  Facebook.logout = function(){
	  	return $cordovaFacebook.logout()
	  } 

		return Facebook
	})