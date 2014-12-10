angular.module('goodMood')
  .factory('Auth', function (fb, $firebaseAuth, $firebase, $state, $q, Facebook, utils){
  	var Auth = $firebaseAuth(fb.ref)

  	// Sets up the scope options for each authProvider
  	// and then calls the auth provider (in the device-specific manner?)
  	Auth.viaOAuth = function(authProvider){
  		var options = {};
  		if (authProvider === 'facebook'){
  			return Facebook.getToken().then(function(token){
  				return Auth.$authWithOAuthToken('facebook', token)
  			})
  		}
  		if (authProvider === 'google'){
  		  options = {scope: 'email'}
  		  return Auth.$authWithOAuthPopup(authProvider, options)
  		}
  	}

  	Auth.logout = function(){
  		Auth.$unauth() 
  		$state.reload()
  	}

  	Auth.currentUser = null;

    return Auth
  })