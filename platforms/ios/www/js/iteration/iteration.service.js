angular.module('goodMood')
	.factory('Iteration', function(fb, $firebase, $FirebaseObject, $q, Thread, $timeout, Picture){
		var Iteration = {};

		Iteration.ref = fb.iterations;

    var IterationFactory = $FirebaseObject.$extendFactory({    

    	$addThread: function(thread){
    		if (!thread || !thread.$id) {
    			throw new TypeError('thread must have id!')
    		}
        var obj = {};
        obj[thread.$id] = true;
    		return this.$inst().$update('threads', obj).then(function(obj){
          return thread
        })
    	},

    	$removeThread: function(thread){
    		if (!thread.$id) {
    			throw new TypeError('thread must have id!')
    		}
    		// check if this thread exists here...
    		if(!this.threads || !this.threads[thread.$id]){
    			throw new Error('youre trying to remove a thread that does not exist')
    		}

        var ref = this.$inst().$ref().child('threads')
        return $firebase(ref).$remove(thread.$id)    		
    	},

      $getImage: function(){
      	if (!this.image){
      		throw new Error('we have an iteration without an image!')
      	}
        return Picture.findById(this.image)
      },

  		$getThreads: function(){  			
        var threads = {}
        var ref = this.$inst().$ref();
        var deferred = $q.defer();
        ref.once('value', function(snap){
          deferred.resolve(threads)
        })
        ref.child('threads').on('child_added', function(snap){
          
          var id = snap.key()
          Thread.findById(id).then(function(thread){
            threads[id] = thread
          })
        })
        ref.child('threads').on('child_removed', function(snap){
          if (threads[snap.key()]){
           delete threads[snap.key()] 
          }
        })
        // Hack so that it isn't discarded as an empty object,
        // but still looks empty / has _.size of 0 
        Object.defineProperty(threads, '_notEmpty', {
          value: true,
          enumerable: false
        })
        return deferred.promise
  		},
		})

    /**
     * Creates a new iteration. Requires: IMAGE, COLLABORATION
     * @param {object} original An object with the necessary ingrediants
     * @returns Promise that resolves to an instance of the iteration
     */
    Iteration.create = function(original){
      var image = original.image;
      var collaboration = original.collaboration;
    	// Validate data
    	if (!image || typeof image.$id !== 'string') {
        throw new TypeError('image must be string (an id, technically)')
      };
      if (!collaboration || typeof collaboration.$id !== 'string'){
      	throw new TypeError('collaboration should be $firebase object')
      };

      // Create data for iteration
      data = {};
      data.collaboration = collaboration.$id
      data.image = image.$id
      data.createdAt = Firebase.ServerValue.TIMESTAMP;
      // Create $firebase obj and return promise
    	var ref = Iteration.ref.push(data);
      ref.setPriority(data.collaboration)
    	var obj = $firebase(ref, {objectFactory: IterationFactory})
    	return obj.$asObject().$loaded()
    }

		Iteration.findById = function(id){
			if (!id){
				throw new TypeError('id needed to findById')
			}
			return $firebase(Iteration.ref.child(id), {objectFactory: IterationFactory})
        .$asObject().$loaded()
		}

		return Iteration
	})
