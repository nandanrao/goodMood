angular.module('goodMood')
	.factory('Thread', function(fb, $firebase, $FirebaseObject, $q, $timeout, Auth){
		var Thread = {};

    var ThreadFactory = $FirebaseObject.$extendFactory({
      /**
       * Open must be called every time this thread is viewed!
       */
      $open: function(){
        this.$inst().$ref()
          .child('lastViewed')
          .child(Auth.currentUser.$id)
          .set(99999999999999)
        // On connection close, timestamp the lastViewed
        // TODO: Create process for multi-device!
        this.$inst().$ref()
          .child('lastViewed')
          .child(Auth.currentUser.$id)
          .onDisconnect()
          .set(Firebase.ServerValue.TIMESTAMP)
      },

      /**
       * Close must be called every time this thread is 
       * left/closed/no-longer-viewed! add an onDisconnect to 
       * keep track of this...? 
       */
      $close: function(){
        this.$inst().$ref()
          .child('lastViewed')
          .child(Auth.currentUser.$id)
          .set(Firebase.ServerValue.TIMESTAMP)
        // Cancel the onDisconnect listener for this data
        this.$inst().$ref()
          .child('lastViewed')
          .child(Auth.currentUser.$id)
          .onDisconnect()
          .cancel()
      },

      /**
       * Creates a brand new message from content data, 
       * and adds it to the database
       */
      $addMessage: function(data){
        if(!data.content || !data.user){
          throw new TypeError('bad data!')
        }
        data = _.cloneDeep(data)
        data.thread = this.$id;
        data.sentAt = Firebase.ServerValue.TIMESTAMP;
        var ref = fb.messages.push(data)
        ref.setPriority(this.$id)
        // $timeout(angular.noop)
        return $firebase(ref).$asObject().$loaded()
      },

      /**
       * Deletes a message permanently.
       * @param {object} message 
       * @returns promise that resolves when message is deleted from database
       */
      $removeMessage: function(message){
        if (!message || !message.$id){
          throw new TypeError('this aint no message')
        }
        return message.$remove()
      },

      $getMessages: function(){
        // Firebase2.0 --> transition to orderbychild!
        // var ref = fb.messages.orderByChild('thread').equalTo(this.$id);
        var ref = fb.messages.startAt(this.$id).endAt(this.$id)
        return $firebase(ref).$asArray().$loaded();
      }
    })

		Thread.ref = fb.threads;

    /**
     * Creates a new thread on a particular iteration
     * @param {object} drawing The paperJS object created from the initial sketch
     * @param {object} iteration The iteration instance where the thread was started
     * @param {object} collaboration The collaboration 
     * @returns A promise that resolves to a populated thread instance
     */
    Thread.create = function(drawing, iteration, collaboration){
    	// Validate data... 
      var data = {}
      // add iteration...
      data.iterations = {};
      data.iterations[iteration.$id] = true
      // // lastViewed ------ do we really need this here? Or just call open when created? 
      data.lastViewed = {};
      data.lastViewed[Auth.currentUser.$id] = Firebase.ServerValue.TIMESTAMP;
      // // add everything else
      data.collaboration = collaboration.$id;
      data.drawing = drawing;
      data.createdBy = Auth.currentUser.$id
      data.createdAt = Firebase.ServerValue.TIMESTAMP;
      // Create firebase object
    	var ref = Thread.ref.push(data);
    	var obj = $firebase(ref, {objectFactory: ThreadFactory})
    	return obj.$asObject().$loaded()
    }

    /**
     * Basic finding-by-id-steez
     */
		Thread.findById = function(id){
			return $firebase(Thread.ref.child(id), {objectFactory: ThreadFactory})
        .$asObject().$loaded()
		}

    /** 
     * Creates a Bacon stream that contains a hash with all unread messages
     * @param {object} thread
     * @param {string} userId
     * @returns Bacon Bus
     */
    Thread.getNewMessagesAsStream = function(id){
      var thread;
      var ref = fb.messages.startAt(id).endAt(id)
      var bus = new Bacon.Bus()
      var loadMessages = function(snap){
        // This is ugly! Need to keep that $id somehow...
        // var promises = [];
        // snap.forEach(function(childSnap){
        //   var ref = childSnap.ref()
        //   promises.push($firebase(ref).$asObject().$loaded())
        // })
        // $q.all(promises).then(function(results){
        //   bus.push(results)
        // })
        var arr = [];
        snap.forEach(function(childSnap){
          arr.push(childSnap.val())
        })
        bus.push(arr)
      }
      Thread.findById(id).then(function(_thread){
        thread = _thread
        ref.on('value', loadMessages)
      })

      var off = function(){
        ref.off('value', loadMessages)
      }

      var stream = bus.flatMap(function(arr){
        return _.filter(arr, function(obj){
          var lastViewed = thread.lastViewed[Auth.currentUser.$id]
          if (!lastViewed) {
            return true
          }
          return obj.sentAt > lastViewed
        })
      })

      return {
        stream: stream,
        off: off
      }

    }

		return Thread
	})
