describe('Factory: Iteration', function(){

	var fb,
			Iteration,
			seed1,
			$rootScope,
			$firebase,
			$timeout,
			threadSeed,
			$q,
			image,
			collaboration

	var Thread = {
		findById: undefined
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
			$provide.value('Thread', Thread)
		});
		module('fbMock');
		module('authMock');
	})

	beforeEach(inject(function (_fb_, _Iteration_, _$firebase_,  _$rootScope_, _$timeout_, _Thread_, _$q_){
		$timeout = _$timeout_;
		$rootScope = _$rootScope_;		
		fb = _fb_;
		$q = _$q_;
		$firebase = _$firebase_;
		Iteration = _Iteration_;
		Thread = _Thread_;
		Thread.findById = sinon.stub()
			.returns($q.when({'test': 'iteration'}))
	}))

	beforeEach(function(done){
		// create mock collaboration as a $firebase object for use in seed data
		var ref = fb.collaborations.push({'test':'test'})
		$firebase(ref).$asObject().$loaded().then(function(obj){
			collaboration = obj;
			done();
		})
		flushAll()
	})


	beforeEach(function(done){
		var ref = fb.images.push({'test':'test'})
		$firebase(ref).$asObject().$loaded().then(function(obj){
			image = obj
			done()
		})
		flushAll()
	})
		
	beforeEach(function(){
		seed1 = {
			collaboration: collaboration,
			image: image
		}
	})

	describe('Static Methods', function(){

		describe('create', function(){
			
			it('returns a promise', function(){
				Iteration.create(seed1).should.have.property('then')
			})

			it('throws a typeerror when image is not a string', function(){
				seed1.image = {};
				Iteration.create.bind(this,seed1).should.Throw(TypeError)
			})

			it('throws a typeerror when collaboration is not a $firebase object', function(){
				seed1.collaboration = {};
				Iteration.create.bind(this,seed1).should.Throw(TypeError)
			})

			it('does not throw when given proper data', function(){
				Iteration.create.bind(this, seed1).should.not.Throw()
			})

			it('it pushes a new iteration to the db', function(done){
				var instance = Iteration.create(seed1)
				fb.iterations.once('value', function(snap){
					_.size(snap.val()).should.equal(1)
					done()
				})
				flushAll()
			})

			it('resolves to an instance with the original data', function(done){
				Iteration.create(seed1)
					.then(function(obj){
						obj.collaboration.should.equal(seed1.collaboration.$id)
						obj.image.should.equal(seed1.image.$id)
						done()
					});
				flushAll()
				flushAll()
			})
		})

		describe('findById', function(){
			var iteration;

			beforeEach(function(done){
				Iteration.create(seed1).then(function(obj){
					iteration = obj
					done()
				})
				flushAll()
				flushAll()
			})

			it('returns a promise', function(){
				Iteration.findById('blah').should.have.property('then')
			})

			it('throws an error when not given a string', function(){
				Iteration.findById.bind(null, null).should.Throw(TypeError)
			})

			it('resolves to an instantiated iteration instance', function(done){
				Iteration.findById(iteration.$id).then(function(obj){
					obj.$id.should.equal(iteration.$id)
					done()
				})
				flushAll()
				flushAll()				
			})
		})
		
	})

	describe('Instance Methods', function(){
		var iteration;
		var thread;

		beforeEach(function(done){
			threadSeed = {
				'createdBy': 'test',
				'collaboration': 'test'
			}
			var ref = fb.threads.push(threadSeed)
			$firebase(ref).$asObject().$loaded().then(function(obj){
				thread = obj;
			})
			flushAll()

			Iteration.create(seed1).then(function(obj){
				iteration = obj;
				done()
			})
			flushAll()
			flushAll()
		})

		describe('$addThread', function(){

			it('returns a promise', function(){
				iteration.$addThread(thread).should.have.property('then')
			})

			it('throws an error when not given a thread instance', function(){
				var notThread = {};
				iteration.$addThread.bind(iteration, notThread).should.Throw()
			})

			it('does not throw when given a proper thread', function(){
				iteration.$addThread.bind(iteration, thread).should.not.Throw()
			})

			it('adds the threads $id to its threads property on the db', function(){
				_.size(iteration.threads).should.equal(0)
				iteration.$addThread(thread)
				flushAll()
				iteration.threads.should.have.property(thread.$id)
			})
		})

		describe('$removeThread', function(){
			var thread2;
			
			// is this a bad way to test? 
			// I'm using one method to generation seed data for another...
			beforeEach(function(){
				iteration.$addThread(thread)
				flushAll()
			})

			beforeEach(function(){
				var ref = fb.threads.push({'test2':'test2'})
				$firebase(ref).$asObject().$loaded().then(function(obj){
					thread2 = obj;
				})
				flushAll()
			})

			it('returns a promise', function(){
				iteration.$removeThread(thread).should.have.property('then')
			})

			// should we allow it to take just an id???
			it('throws a type error if not given thread object', function(){
				var notThread = {};
				iteration.$removeThread.bind(iteration, notThread).should.Throw(TypeError)
			})

			it('throws an error if it does not have the thread', function(){
				iteration.$removeThread.bind(iteration, thread).should.not.Throw()
			})

			it('asynchronously removes the thread from the threads hash on the db', function(){
				iteration.$removeThread(thread)
				fb.iterations.child(iteration.$id).child('threads').on('value', function(snap){
					should.not.exist(snap.val())
				})
				flushAll()
			})
		})

		describe('$getThreads', function(){
			var threads;

			beforeEach(function(){
				iteration.$getThreads().then(function(obj){
					threads = obj
				})
				flushAll()
			})

			it('resolves to _threads, which reacts to added threads', function(){
				threads.should.not.have.property(thread.$id)
				iteration.$addThread(thread)
				flushAll()
				threads.should.have.property(thread.$id)
			})

			it('resolves to _threads, which reacts to removed threads', function(){
				iteration.$addThread(thread)
				flushAll()
				threads.should.have.property(thread.$id)
				iteration.$removeThread(thread)
				flushAll()
				threads.should.not.have.property(thread.$id)
			})

		})

	})

})