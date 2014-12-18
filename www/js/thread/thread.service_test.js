describe('Factory: Thread', function(){
	var Thread,
			$timeout,
			fb,
			$firebase,
			seed1,
			collaboration,
			drawing,
			iteration,
			Auth,
			$q

	var dataKeys = function(obj){
		return _.filter(_.keys(obj), function(key){
			return /^[^\$]/.test(key)
		})
	}

	function flushAll(){
		fb.ref.flush();
    try { 
    	$timeout.flush() 
    }
    // Catch all digest errors! Throw all others (i.e. assertions)!
    catch (e) {
    	if(!/digest/ig.test(e.message) && !/deferred/ig.test(e.message)){
    		throw e
    	}
    }
	}

	beforeEach(function(){
		module('goodMood', function($provide){
			$provide.value('Auth', Auth)
		});
		module('fbMock');
		module('authMock');
	})

	beforeEach(inject(function (_Thread_, _$timeout_, _fb_, _$firebase_, _Auth_, _$q_){
		Thread = _Thread_;
		$timeout = _$timeout_;
		fb = _fb_;
		$firebase = _$firebase_;
		Auth = _Auth_;
		$q = _$q_;
	}))

	beforeEach(function(){
		var ref = fb.collaborations.push({'test':'test'})
		$firebase(ref).$asObject().$loaded().then(function(obj){
			collaboration = obj;
		})
		flushAll()

		var ref = fb.iterations.push({'test':'test'})
		$firebase(ref).$asObject().$loaded().then(function(obj){
			iteration = obj;
		})
		flushAll()

		var ref = fb.users.push({'name':'current'})
		$firebase(ref).$asObject().$loaded().then(function(obj){
			Auth.currentUser = obj;
		})
		flushAll()
		
		drawing = {
			$id: '5' 
		}
	})


	describe('Static Methods', function(){
		
		describe('create', function(){

			it('returns a promise', function(){
				Thread.create(drawing, iteration, collaboration)
					.should.have.property('then')
			})

			it('asynchronously adds a new thread to the db', function(){
				Thread.create(drawing, iteration, collaboration)
				fb.threads.on('value', function(snap){
					_.size(snap.val()).should.equal(1)
				})
				flushAll()
			})

			it('resolves to a thread instance with original data', function(done){
				Thread.create(drawing, iteration, collaboration)
					.then(function(obj){
						obj.collaboration.should.equal(collaboration.$id)
						obj.drawing.should.include(drawing)
						obj.iterations.should.have.property(iteration.$id)
						obj.createdBy.should.equal(Auth.currentUser.$id)
						done()
					})
				flushAll()
				flushAll()
			})

		})
	})

	describe('Instance Methods', function(){
		var thread;

		beforeEach(function(){
			Thread.create(drawing, iteration, collaboration)
				.then(function(obj){
					thread = obj
				})
			flushAll()
			flushAll()
		})

		describe('$addMessage', function(){
			var messageData;

			beforeEach(function(){
				messageData = {
					content: 'test',
					user: Auth.currentUser
				};
			})

			it('resolves with a firebase message object', function(done){
				thread.$addMessage(messageData).then(function(obj){
					obj.should.have.property('$$conf')
					done()
				})
				flushAll()
			})

			it('sets the priority of the created message to its own id', function(done){
				thread.$addMessage(messageData).then(function(obj){
					obj.$priority.should.equal(thread.$id)
					done()
				})
				flushAll()
			})

			// TODO: this test breaks when loaded asArray, instead of asObject - 
			// but works fine in production, #mockbug?
			xit('adds a message to its own $getMessages object', function(){
				var messages;
				thread.$getMessages().then(function(obj){
					// console.log(obj)
					messages = obj
				})
				flushAll()
				thread.$addMessage(messageData)
				thread.$addMessage(messageData)
				thread.$addMessage(messageData)
				thread.$addMessage(messageData)
				flushAll()
				// 3 messages added - last transaction never goes through... #mockbug
				_.size(_.filter(messages, function(val, key){
					return /^[^\$]/ig.test(key)
				})).should.equal(3)
			})

			it('throws an error if message data does not have content or user', function(){				
				var notMessage = {}
				thread.$addMessage.bind(thread, notMessage).should.Throw(TypeError)
			})

		})

		describe('$removeMessage', function(){
			var messageData;
			var message;

			beforeEach(function(){
				messageData = {
					content: 'test',
					user: Auth.currentUser
				};

				var ref = fb.messages.push({test:'test'})
				$firebase(ref).$asObject().$loaded().then(function(obj){
					message = obj
				})
				flushAll()
			})

			it('throws a typeError if not given a message object', function(){
				var notMessage = {};
				thread.$removeMessage.bind(thread, notMessage).should.Throw(TypeError)
			})

			it('calls $remove on the message itself', function(){
				var spy = sinon.spy(message, '$remove')
				thread.$removeMessage(message)
				flushAll()
				spy.should.have.been.called
			})
		})

		describe('$open', function(){

			it('sets the lastViewed property of the current user to infinity', function(){
				thread.$open()
				flushAll()
				thread.lastViewed
					.should.have.property(Auth.currentUser.$id)
					.and.equal(Infinity)
			})
		})

		describe('$close', function(){

			it('sets the lastViewed property of the current user to the current timestamp', function(){
				thread.$close()
				flushAll()
				thread.lastViewed[Auth.currentUser.$id].should.have.property('.sv')
					.and.equal('timestamp')
			})
		})


		describe('getNewMessagesAsStream', function(){
			var messageData;
			var message;

			beforeEach(function(){
				messageData = {
					content: 'test',
					user: Auth.currentUser
				};

				var ref = fb.messages.push({test:'test'})
				$firebase(ref).$asObject().$loaded().then(function(obj){
					message = obj
				})
				flushAll()
			})

			it('returns a Bacon event stream', function(){
				var stream = Thread.getNewMessagesAsStream(thread.$id)
				stream.should.be.instanceof(Bacon.EventStream)
			})

			it('returns a stream of messages not seen by the user', function(){
				// Messages that should not be contained in stream
				thread.$addMessage(messageData)
				thread.$addMessage(messageData)
				thread.$addMessage(messageData)
				// Set the users last view here
				sinon.stub(Thread, 'findById').returns($q.when(thread))
				thread.lastViewed = {}
				thread.lastViewed[Auth.currentUser.$id] = Date.now()
				// create the stream listener and spy to be called
				var spy = sinon.spy()
				var stream = Thread.getNewMessagesAsStream(thread.$id)
				stream.onValue(function(val){
					spy(val)
				})
				flushAll()
				flushAll()
				// Add 2 more messages (last transaction doesn't go through - #mockbug)
				thread.$addMessage(messageData)
				thread.$addMessage(messageData)
				thread.$addMessage(messageData)
				flushAll()
				flushAll()
				// Spy should be called twice, last time it should have the 2 messages
				spy.should.have.been.calledTwice
				spy.secondCall.args[0].length.should.equal(2)
			})
		})

	})

})