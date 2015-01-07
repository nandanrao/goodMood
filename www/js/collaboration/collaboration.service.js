angular.module('goodMood')
	.factory('Collaboration', function(fb, $firebase, $FirebaseObject, $q, Auth, Iteration, Thread, Image, utils, $timeout){
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
        var ref = this.$inst().$ref().child('users');
        var deferred = $q.defer();
        ref.once('value', function(snap){
          var promises = {};
          snap.forEach(function(snap){
            var id = snap.key();
            var ref = fb.users.child(id);
            promises[id] = $firebase(ref).$asObject().$loaded()
          })
          $q.all(promises).then(function(results){
            _.forEach(results, function(user){
              users[user.$id] = user
            })
            deferred.resolve(users)
            ref.on('child_added', function(snap){
              var id = snap.key()
              if(!users[id]){
                var ref = fb.users.child(id)
                $firebase(ref).$asObject().$loaded().then(function(obj){
                  users[obj.$id] = obj
                })  
              }
              
            })
            ref.on('child_removed', function(snap){
              if (users[snap.key()]){
               delete users[snap.key()] 
              }
            })    
          }, deferred.reject)
        })

        // Hack so that it isn't discarded as an empty object,
        // but still looks empty / has _.size of 0 
        Object.defineProperty(users, '_notEmpty', {
          value: true,
          enumerable: false
        })
        return deferred.promise
      },

      /**
       * Adds a current iteration instance to this collaboration
       * @param {object} iteration An iteration instance
       * @returns The iteration instance passed into it.
       */
      $addIteration: function(iteration){
        if (!iteration || !iteration.$id || !iteration.image){
          throw new TypeError('we need an iteration object')
        }
        this.$inst().$set('lastImage', iteration.image)
        var obj = {}
        obj[iteration.$id] = true;
        return this.$inst().$update('iterations', obj).then(function(obj){
          return iteration
        })
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
        var threads = {};
        var ref = fb.threads.startAt(this.$id).endAt(this.$id)
        ref.on('child_added', function(snap){
          $firebase(snap.ref()).$asObject().$loaded().then(function(obj){
            threads[obj.$id] = obj
          })
        })
        ref.on('child_removed', function(snap){
          delete threads[snap.key()]
        })
        return $q.when(threads)
      },

      // Note: this is where we attempt to convert the Bacon/FRP streams
      // into a POJO that Angular can put on its scope and watch.
      // TODO: should deferred.resolve here be AFTER the forEach loops? 
      $getNewMessages: function(){
        var self = this;
        var newMessages = {};
        Object.defineProperty(newMessages, '_notEmpty', {
          value: true,
          enumerable: false
        })

        var deferred = $q.defer();
        var stream = Collaboration.getNewMessagesAsStream(this.$id)
        stream.onValue(function(val){
          console.log('onvalue in stream for getnewmessages!', self.$id)
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
          throw new Error('get new message stream eerr:', err)
        })
        return deferred.promise
      },

      $getLastImage: function(){
        var lastImage = {};
        var deferred = $q.defer();
        
        var ref = this.$inst().$ref().child('lastImage')
        ref.on('value', function(snap){
          if (!snap.val()){
            return deferred.resolve(lastImage)
          }
          Image.findById(snap.val()).then(function(image){
            lastImage.image = image;
            deferred.resolve(lastImage)
          }, deferred.reject)
        })

        Object.defineProperty(lastImage, '_notEmpty', {
          value: true,
          enumerable: false
        })
        return deferred.promise
      },
  	
      $populate: function(){
        var self = this;
        return $q.all({
            lastImage: self.$getLastImage(),
            newMessages: self.$getNewMessages()
          })
          .then(function(results){
            self._lastImage = results.lastImage;
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
      var ref = fb.threads.orderByChild('collaboration').equalTo(id)
      return Bacon.fromEventTarget(ref, 'value')
        .map(function(snap){
          console.log("mapping over fb value")
          return _.keys(snap.val())
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
