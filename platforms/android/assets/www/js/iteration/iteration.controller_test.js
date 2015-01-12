describe('Controller: Iteration', function(){

		var IterationCtrl,
		    Auth,
		    $q,
		    $window,
		    $log,
		    $state,
		    $scope,
		    collaboration,
		    iteration,
		    fb,
		    threads,
		    image,
		    $ionicGesture,
		    Thread,
		    thread

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
		  module('goodMood')
		  module('fbMock');
		  module('stateMock');
		  module('authMock');
		})

		beforeEach(inject(function ($controller, _$q_, _$rootScope_, _$state_, _fb_, _$timeout_){
			fb = _fb_;
			$timeout = _$timeout_;
		  $rootScope = _$rootScope_;
		  $scope = $rootScope.$new();
		  $state = _$state_;
		  $window = {
		    alert: sinon.spy()
		  }
		  $log = {
		    error: sinon.spy(),
		    debug: sinon.spy()
		  }
		  $q = _$q_;

		  iteration = {
		  	$id: 'id',
		  	$addThread: sinon.stub().returns($q.when({
		  		$id: 'id'
		  	}))
		  };

		  collaboration = {
		  	$id: 'id',
		  	$addIteration: sinon.stub().returns($q.when(iteration))
		  };

		  $ionicGesture = {	
		  	on: function(type, fn){
		  	}
		  }

		  image = {
		  	$value: 'img'
		  }

		  thread = {
		  	$id: 'thread'
		  }

		  Thread = {
		  	create: sinon.stub().returns($q.when(thread))
		  }

		  IterationCtrl = $controller('IterationCtrl', {
		    $window: $window,
		    $log: $log,
		    $scope: $scope,
		    collaboration: collaboration,
		    iteration: iteration,
		    $ionicGesture: $ionicGesture,
		    Thread: Thread,
		    threads: threads,
		    image: image
		  })

		}))

		xdescribe('on addThread event', function(){

			beforeEach(function(){
				$state.expectTransitionTo('^.^.thread')
			})

			it('creates a new thread', function(){
				$scope.$emit('addThread')
				flushAll()
				Thread.create.should.have.been.called
			})

			it('adds that thread to itself', function(){
				$scope.$emit('addThread')
				flushAll()
				iteration.$addThread.should.have.been.calledWith(thread)
			})

			it('transitions to state thread', function(){
				$scope.$emit('addThread')
				flushAll()
				$state.ensureAllTransitionsHappened()
			})
		})

})