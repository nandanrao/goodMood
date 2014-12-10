angular.module('goodMood')
	.factory('Iteration', function(fb, $firebase, $FirebaseObject, $q, Thread){
		var Iteration = {};

		Iteration.ref = fb.iterations;

    var IterationFactory = $FirebaseObject.$extendFactory({    

    	$addThread: function(thread){
    		if (!thread || !thread.$id) {
    			throw new TypeError('thread must have id!')
    		}
        var obj = {};
        obj[thread.$id] = true;
    		return this.$inst().$update('threads', obj)
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
        var ref = fb.images.child(this.image)
      	return $firebase(ref).$asObject().$loaded()
      },

  		$getThreads: function(){  			
        var threads = {}
        var ref = this.$inst().$ref();
        var deferred = $q.defer();
        ref.child('threads').on('child_added', function(snap){
          var id = snap.key()
          Thread.findById(id).then(function(iteration){
            threads[id] = iteration
          })
        })
        ref.child('threads').on('child_removed', function(snap){
          if (threads[snap.key()]){
           delete threads[snap.key()] 
          }
        })
        ref.once('value', function(snap){
          deferred.resolve(threads)
        })
        // Hack so that it isn't discarded as an empty object,
        // but still looks empty / has _.size of 0 
        Object.defineProperty(threads, '_notEmpty', {
          value: true,
          enumerable: false
        })
        return deferred.promise
  		},

      $populate: function(){
        var self = this;
        return $q.all({
	      		image: self.$getImage()
	      	})
	        .then(function(results){
	        	self._image = results.image;
	        	return self;
	        })
      }
		})

    // Helper function that returns a populated Iteration object
    var populate = function(obj){
    	return obj.$populate();
    }

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
    	return obj.$asObject().$loaded().then(populate)
    }

		Iteration.findById = function(id){
			if (!id){
				throw new TypeError('id needed to findById')
			}
			return $firebase(Iteration.ref.child(id), {objectFactory: IterationFactory})
        .$asObject().$loaded().then(populate)
		}

		return Iteration
	})
