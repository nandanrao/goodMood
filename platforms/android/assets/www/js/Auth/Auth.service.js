angular.module('goodMood')
  .factory('Auth', function ($window, $firebaseAuth, $firebase, $state, $q, fb, Facebook, utils){
  	var Auth = $firebaseAuth(fb.ref)

    Auth.$onAuth(function(authData) {
      if (authData) {
        // logged in
      } else {
        // logged out
        if($window.cookies){
          $window.cookies.clear(function() {
            console.log("Cookies cleared!");
          });
        }
      }
    });

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