angular.module('goodMood')
	.factory('User', function (fb, $FirebaseObject, $firebase, $q, Facebook, Collaboration, utils, Auth){

		var User = {};

    User.ref = fb.users;

    var UserFactory = $FirebaseObject.$extendFactory({    

    	$getCollaborationsAsStream: function(){
    		var bus = new Bacon.Bus()
    		this.$inst().$ref().child('collaborations').on('value', function(snap){
    			bus.push(snap.val())
    		})
    	  return bus
    	},

    	$getNewMessagesAsStream: function(){
    	  return utils.gatherMessageStreams(
    	    this.$getCollaborationsAsStream(),
    	    Collaboration.getNewMessagesAsStream
    	  )
    	}, 

      $addCollaboration: function(){
        var self = this;
        return Collaboration.create().then(function(collaboration){
          var obj = {}
          obj[collaboration.$id] = true;
          return self.$inst().$update('collaborations', obj).then(function(ref){
            return collaboration
          })
        })
      },

      $getCollaborations: function(){
        var collaborations = {};
        var ref = this.$inst().$ref().child('collaborations');
        var deferred = $q.defer();
        ref.on('child_added', function(snap){
          var id = snap.key()
          Collaboration.findById(id).then(function(collaboration){
            collaborations[id] = collaboration
          })
        })
        ref.on('child_removed', function(snap){
          if (collaborations[snap.key()]){
           delete collaborations[snap.key()] 
          }
        })
        // This just resolves when the first set of data is available.
        ref.once('value', function(snap){
          deferred.resolve(collaborations)
        })
        // Hack so that it isn't discarded as an empty object,
        // but still looks empty / has _.size of 0 
        Object.defineProperty(collaborations, '_notEmpty', {
          value: true,
          enumerable: false
        })
        return deferred.promise 
      }

    })

    // Helper function that keeps track of how to get pictures from
    // different auth providers
    function getPictureFromOAuth(authProvider, authObj){
      if (authProvider === 'facebook'){
        return Facebook.getPicture()
        // return authObj[authProvider].cachedUserProfile.picture.data.url
      }
      else if (authProvider === 'google'){
        return $q.when(authObj[authProvider].cachedUserProfile.picture)
      }
      else throw new Error('We dont support this non-existent auth provier')
    }

    /**
     * Creates a new user in the database
     * @param {string} authProvider The name of the the authorization provider
     * @param {object} authObj The object returned from firebase oAuth process
     * @returns A promise that resolves to the created user instance
    */
    User.create = function(authProvider, authObj){
    	var deferred = $q.defer();
      var dataReady = $q.defer();
      var data = {};
      if (authProvider){
        if (! authObj || !authObj[authProvider]){
          throw new TypeError('authObj is not a proper authObj!')
        }
        getPictureFromOAuth(authProvider, authObj).then(function(picture){
          data.picture = picture
          dataReady.resolve()
        })
        data[authProvider] = authObj[authProvider];
        data.displayName = authObj[authProvider].displayName;
        data.email = authObj[authProvider].email;
      }
      else {
        // put local login stuff here?? 
        dataReady.resolve()
        deferred.reject(new Error('we need an auth provider to login'))
      }
      dataReady.promise.then(function(){
        var key = utils.escapeEmailAddress(authObj[authProvider].email)
        var ref = User.ref.child(key)
        var obj = $firebase(ref, {objectFactory: UserFactory});
        obj.$update(data)
        obj.$asObject().$loaded().then(deferred.resolve)  
      })
      return deferred.promise
    }

    User.findById = function(id){
      return $firebase(User.ref.child(id), {objectFactory: UserFactory})
        .$asObject().$loaded()
    }


    /**
     * Finds a user in the database, by Auth provider
     * @param {string} authProvider The name of the the authorization provider
     * @param {object} authObj The object returned from firebase oAuth process
     * @returns A promise that resolves to user instance if found, or resolves with nothing
     * when not found
    */
    User.findByAuth = function(authProvider, authObj){
      var deferred = $q.defer();
      var email = authObj[authProvider].email;
      var key = utils.escapeEmailAddress(email);
      fb.users.child(key).once('value', function(snap){
        if (snap.val()){
          var obj = $firebase(snap.ref(), {objectFactory: UserFactory});
          obj.$update(authProvider, authObj[authProvider])
          deferred.resolve(obj.$asObject().$loaded())  
        }
        // resolve with nothing if user not found
        else deferred.resolve()
      })
      return deferred.promise
    }


    /**
     * Returns a promise that resolves with the current instantiated user object
    */
    User.getCurrentUser = function(){
      var deferred = $q.defer()
      if (Auth.currentUser){
        deferred.resolve(Auth.currentUser)
      }
      var authData = Auth.$getAuth()
      if (!authData) {
        deferred.reject('not logged in')
      }
      else {
        User.findByAuth(authData.provider, authData)
          .then(function(user){
            Auth.currentUser = user;
            deferred.resolve(user)
          })
      }
      return deferred.promise
    }

    Auth.$onAuth(function(authData){
      if (authData){
        User.findByAuth(authData.provider, authData)
          .then(function(user){
            Auth.currentUser = user;
          })
      }
    })

    return User

	})