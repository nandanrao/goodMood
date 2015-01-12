describe('Factory: Collaboration', function(){
	var Collaboration,
			$timeout,
			fb,
			$q,
			$firebase,
			user1,
			user3,
			$rootScope,
			Auth

	var Iteration = {
		findById: undefined
	}

	var Thread = {
		findById: undefined
	}

	var User = {
		findById: undefined
	}

	var utils = {
		gatherMessageStreams: sinon.stub().returns(
				Bacon.interval(0, [{$id: 'id'}])
			)
	}


	function flushAll(){
		fb.ref.flush();
    try { 
    	$timeout.flush() 
    }
    // Catch all digest errors! Throw all others!
    catch (e) {
    	if(!/digest/ig.test(e.message) && !/deferred/ig.test(e.message)){
    		throw e
    	}
    }
	}

	beforeEach(function(){

		module('goodMood', function($provide){
			$provide.value('Auth', Auth)
			$provide.value('Iteration', Iteration)
			$provide.value('Thread', Thread)
			$provide.value('User', User)
			$provide.value('utils', utils)
		});
		module('fbMock');
		module('authMock');
	})

	beforeEach(inject(function (_Collaboration_, _$timeout_, _fb_, _$firebase_, _$rootScope_, _Iteration_, _Thread_, _$q_, _User_, _Auth_, _utils_){
		$rootScope = _$rootScope_;
		Collaboration = _Collaboration_;
		$timeout = _$timeout_;
		fb = _fb_;
		$q = _$q_;
		$firebase = _$firebase_;
		Auth = _Auth_;
		Iteration = _Iteration_;
		Thread = _Thread_;
		utils = utils;
		Iteration.findById = sinon.stub()
			.returns($q.when({'test': 'iteration'}))
		User = _User_;
		User.findById = sinon.stub()
			.returns($q.when({'test': 'user'}))

	}))
 
	beforeEach(function(){
		var ref = fb.users.push({'name':'test'})
		$firebase(ref).$asObject().$loaded().then(function(obj){
			user1 = obj;
		})
		flushAll()

		var ref = fb.users.push({'name': 'current'})
		$firebase(ref).$asObject().$loaded().then(function(obj){
			Auth.currentUser = obj
		})
		flushAll()

	})

	describe('Static Methods', function(){

		describe('create', function(){

			it('asynchronously adds a collaboration to the db', function(){
				Collaboration.create('name')
				fb.collaborations.on('value', function(snap){
					_.size(snap.val()).should.equal(1)
					fb.collaborations.off('value')
				})
				flushAll()
			})

			it('resolves to an instance with the original data', function(done){
				Collaboration.create('name').then(function(obj){
					obj.users.should.have.property(Auth.currentUser.$id)
					done()
				}, done)
				// flush time!
				flushAll()
				flushAll()
				setTimeout(flushAll, 0)
			})
		})
	})

	xdescribe('Instance Methods', function(){
		var collaboration;

		beforeEach(function(done){
			var ref = fb.users.push({'name': 'thrid'})
			$firebase(ref).$asObject().$loaded().then(function(obj){
				user3 = obj
			})
			flushAll()

			Collaboration.create('name')
			.then(function(collaboration){
				return collaboration.$populate()
			})
			.then(function(obj){
				collaboration = obj
				done()
			})
			flushAll()
			flushAll()
			setTimeout(flushAll, 0)

		})

		describe('$addUser', function(){

			it('throws an error when not given a user', function(){
				collaboration.$addUser.bind(collaboration, null).should.Throw(TypeError)
			})

			it('asynchronously adds user id to users property', function(){
				_.size(collaboration.users).should.equal(1)
				collaboration.$addUser(user3)
				flushAll()
				_.size(collaboration.users).should.equal(2)
			})

			it('automagically updates the _users property of the instance', function(){
				_.size(collaboration._users).should.equal(1)
				collaboration.$addUser(user3)
				flushAll()
				flushAll()
				_.size(collaboration._users).should.equal(2)
			})

		})

		describe('$removeUser', function(){

			beforeEach(function(){
				collaboration.$addUser(user3)
				flushAll()
				flushAll()
			})

			it('asynchronously removes user id from users property', function(){
				_.size(collaboration.users).should.equal(2)
				collaboration.$removeUser(user3)
				flushAll()
				_.size(collaboration.users).should.equal(1)
			})

			it('automagically updates the _users property of the instance', function(){
				_.size(collaboration._users).should.equal(2)
				collaboration.$removeUser(user3)
				flushAll()
				_.size(collaboration._users).should.equal(1)
			})

		})

		describe('$addIteration', function(){
			var iteration;

			beforeEach(function(done){
				var ref = fb.iterations.push({test:'test', image: 'image'})
				$firebase(ref).$asObject().$loaded().then(function(obj){
					iteration = obj;
					done()	
				})
				flushAll()
			})

			it('throws a typeError when not given an iteration object', function(){
				var notIteration = {}
				collaboration.$addIteration.bind(collaboration, notIteration).should.Throw(TypeError)
			})

			it('resolves to the iteration instance it was passed', function(done){
				collaboration.$addIteration(iteration).then(function(obj){
					obj.should.equal(iteration)
					done()
				})
				flushAll()
				flushAll()
			})

			it('adds the iterations $id to its own iterations property', function(){
				collaboration.$addIteration(iteration)
				flushAll()
				flushAll()
				collaboration.iterations.should.have.property(iteration.$id)
			})

			it('adds multiple iteration $ids to its own iterations property', function(){
				var iteration2
				var ref = fb.iterations.push({test:'test', image: 'image'})
				$firebase(ref).$asObject().$loaded().then(function(obj){
					iteration2 = obj;
				})
				flushAll()
				collaboration.$addIteration(iteration)
				flushAll()
				collaboration.$addIteration(iteration2)
				flushAll()
				_.size(collaboration.iterations).should.equal(2)
			})
		})

		describe('$removeIteration', function(){
			var iteration;

			beforeEach(function(done){
				var ref = fb.iterations.push({test:'test', image: 'image'})
				$firebase(ref).$asObject().$loaded().then(function(obj){
					iteration = obj;
				})
				flushAll()

				collaboration.$addIteration(iteration)	
				setTimeout(function(){
					flushAll()
					done()
				})	
				
			})

			// TODO: make sure this method is actually working the way you think it will!
			it('calls the $remove method on the instance passed to it', function(){
				var spy = sinon.spy(iteration, '$remove')
				collaboration.$removeIteration(iteration)
				spy.should.have.been.called
			})

			it('removes the iterations id from its own iterations property', function(){
				collaboration.iterations.should.have.property(iteration.$id)
				collaboration.$removeIteration(iteration)
				flushAll()
				should.not.exist(collaboration.iterations)
			})

			it('throws a type error when given not-an-iteration', function(){
				var notIteration = {};
				collaboration.$removeIteration.bind(collaboration, notIteration).should.Throw(TypeError)
			})

		})

		describe('$getIterations', function(){
			var iteration;
			var iterations;

			beforeEach(function(done){
				var ref = fb.iterations.push({test:'test', image: 'image'})
				$firebase(ref).$asObject().$loaded().then(function(obj){
					iteration = obj;
					done()	
				})
				flushAll()
			})

			beforeEach(function(done){
				collaboration.$getIterations().then(function(obj){
					iterations = obj
					done()
				})
				flushAll()
			})

			it('updates when a new iteration is added', function(){
				_.size(iterations).should.equal(0)
				collaboration.$addIteration(iteration)
				flushAll()
				_.size(iterations).should.equal(1)
			})

			it('updates when an iteration is removed', function(){
				collaboration.$addIteration(iteration)
				flushAll()
				_.size(iterations).should.equal(1)
				collaboration.$removeIteration(iteration)
				flushAll()
				_.size(iterations).should.equal(0)
			})
		})

		describe('$getThreads', function(){

			it('returns a promise that resolves to an object', function(){
				collaboration.$getThreads().then(function(obj){
					obj.should.be.instanceof(Object)
				})
				flushAll()
			})

			xit('resolves to an object that reacts to added threads', function(){
				var threads;
				collaboration.$getThreads().then(function(obj){
					threads = obj
				})
				flushAll()
				_.size(threads).should.equal(0)
				var ref = fb.threads.push({obj: 'obj'})
				ref.setPriority(collaboration.$id)
				flushAll()
				_.size(threads).should.equal(1)
			})
		})

		describe('$getNewMessages', function(){

			it('returns a reactive object that contains a hash of messages from an event stream', function(done){
				var newMessages;
				collaboration.$getNewMessages().then(function(messages){
					newMessages = messages;
				})
				setTimeout(flushAll, 0)
				setTimeout(function(){
					_.size(newMessages).should.equal(1)
					done()
				}, 10)
			})
		})

		describe('getThreadsAsStream', function(){

			it('returns a bacon event stream', function(){
				var stream = Collaboration.getThreadsAsStream(collaboration.$id)
				stream.should.be.instanceof(Bacon.EventStream)
			})
		})

	})

})

