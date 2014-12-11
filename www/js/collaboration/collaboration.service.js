angular.module('goodMood')
	.factory('Collaboration', function(fb, $firebase, $FirebaseObject, $q, Auth, Iteration, Thread, utils, $timeout){
		var Collaboration = {};

		Collaboration.ref = fb.collaborations;

    function maker(instance, destination){
    }

    var CollaborationFactory = $FirebaseObject.$extendFactory({    
			
      $addUser: function(user){
        if (!user || !user.$id) {
          throw new TypeError('user must have id!')
        }
        var obj = {};
        obj[user.$id] = true;        
        return this.$inst().$update('users', obj)
      },

      $removeUser: function(user){
        if(!user.$id){
          throw new Error('user must have id!')
        }
        var ref = this.$inst().$ref().child('users')
        return $firebase(ref).$remove(user.$id)
      },

      $getUsers: function(){
        var users = {};
        var ref = this.$inst().$ref();
        var deferred = $q.defer();
        ref.child('users').on('child_added', function(snap){
          var id = snap.key()
          var ref = fb.users.child(id)
          $firebase(ref).$asObject().$loaded().then(function(obj){
            users[obj.$id] = obj
          })
        })
        ref.child('users').on('child_removed', function(snap){
          if (users[snap.key()]){
           delete users[snap.key()] 
          }
        })
        // This just resolves when the first set of data is available.
        ref.once('value', function(snap){
          deferred.resolve(users)
        })
        // Hack so that it isn't discarded as an empty object,
        // but still looks empty / has _.size of 0 
        Object.defineProperty(users, '_notEmpty', {
          value: true,
          enumerable: false
        })
        return deferred.promise
      },

      $addIteration: function(iteration){
        if (!iteration || !iteration.$id){
          throw new TypeError('we need an iteration object')
        }
        var obj = {}
        obj[iteration.$id] = true;
        return this.$inst().$update('iterations', obj)
      },

      $removeIteration: function(iteration){
        if(!iteration || !iteration.$id){
          throw new TypeError('iteration needs to be an instantiated object!')
        }
        // remove reference on collaboration object
        var ref = this.$inst().$ref().child('iterations')
        $firebase(ref).$remove(iteration.$id)
        // delete iteration globally
        return iteration.$remove()
      },

      // error handling doesn't propogate here!!!??? 
      $getIterations: function(){
        var iterations = {};
        var ref = this.$inst().$ref();
        var deferred = $q.defer()
        ref.child('iterations').on('child_added', function(snap){
          var id = snap.key()
          Iteration.findById(id).then(function(iteration){
            iterations[id] = iteration
          })
        })
        ref.child('iterations').on('child_removed', function(snap){
          if (iterations[snap.key()]){
           delete iterations[snap.key()] 
          }
        })
        // This just resolves when the first set of data is available.
        ref.once('value', function(snap){
          deferred.resolve(iterations)
        })
        // Hack so that it isn't discarded as an empty object,
        // but still looks empty / has _.size of 0 
        Object.defineProperty(iterations, '_notEmpty', {
          value: true,
          enumerable: false
        })
        return deferred.promise
      },

      $getThreads: function(){
        // var ref = fb.threads.orderByChild('collaboration').equalTo(this.$id)
        var ref = fb.threads.startAt(this.$id).endAt(this.$id)
        return $firebase(ref).$asObject().$loaded()
      },

      $getNewMessages: function(){
        var newMessages = {};
        var deferred = $q.defer();
        var stream = Collaboration.getNewMessagesAsStream(this.$id)
        stream.onValue(function(val){
          deferred.resolve(newMessages)
          _.forEach(newMessages, function(val, key, col){
            delete col[key]
          })
          _.forEach(val, function(message){
            newMessages[message.$id] = message
          })
        })
        stream.onError(function(err){
          deferred.reject(err)
        }) 
        // Hack so that it isn't discarded as an empty object,
        // but still looks empty / has _.size of 0 
        Object.defineProperty(newMessages, '_notEmpty', {
          value: true,
          enumerable: false
        })
        // Wrap in $q when so that its a promise!
        return deferred.promise
      },
  	
      $populate: function(){
        var self = this;
        return $q.all({
            users: self.$getUsers(),
            newMessages: self.$getNewMessages()
          })
          .then(function(results){
            self._users = results.users;
            self._newMessages = results.newMessages;
          	return self;
          })
      }
		})

    // Helper function that returns a populated Collaboration object
    var populate = function(obj){
      
    	return obj.$populate();
    }

    Collaboration.create = function(name){
      var data = {};
      data.users = {};
      data.users[Auth.currentUser.$id] = true;
      data.createdAt = Firebase.ServerValue.TIMESTAMP;
      data.name = name;
      // Create firebase object
    	var ref = Collaboration.ref.push(data);
    	var obj = $firebase(ref, {objectFactory: CollaborationFactory})
    	return obj.$asObject().$loaded()
    		.then(populate)
    }

		Collaboration.findById = function(id){
			return $firebase(Collaboration.ref.child(id), {objectFactory: CollaborationFactory})
        .$asObject().$loaded().then(populate)
		}

    Collaboration.getThreadsAsStream = function(id){
      var ref = fb.threads.startAt(id).endAt(id)
      var bus = new Bacon.Bus()
      return Bacon.fromEventTarget(ref, 'value')
        .map(function(snap){
          return _.pluck(snap.val(), '$id')
        })
    }

    Collaboration.getNewMessagesAsStream = function(id){
      return utils.gatherMessageStreams(
        Collaboration.getThreadsAsStream(id),
        Thread.getNewMessagesAsStream
      )
    }

		return Collaboration
	})
