describe('Controller: NewCollaboration', function(){
	var newCollaboration,
	    Auth,
	    $q,
	    $window,
	    $log,
	    $state,
	    $scope,
	    user,
	    Collaboration,
	    collaboration,
	    fb

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

	  collaboration = {
	  	$id: 'id'
	  }

	  user = {
	    $addCollaboration: sinon.stub().returns($q.when(collaboration))
	  }

	  Collaboration = {
	  	create: sinon.stub().returns($q.when(collaboration))
	  }

	  newCollaboration = $controller('NewCollaborationCtrl', {
	    $window: $window,
	    $log: $log,
	    $scope: $scope,
	    user: user, 
	    Collaboration: Collaboration
	  })

	}))

	describe('submit', function(){

		beforeEach(function(){
			$scope.name = 'name'
			$scope.newCollaborationForm = {
				$valid: true
			}
		})

		it('creates a collaboration with the name from the scope', function(){
			newCollaboration.submit();
			Collaboration.create.should.have.been.calledWith($scope.name)
		})

		it('adds that collaboration to the user', function(){
			$state.expectTransitionTo('collaboration.newIteration')
			newCollaboration.submit();
			flushAll()
			user.$addCollaboration.should.have.been.calledWith(collaboration)
		})

		// TODO: Fix this dumb state mock to actually be useful!
		it('transitions to newIterations state with the id of the created collaboration', function(){
			$state.expectTransitionTo('collaboration.newIteration')
			newCollaboration.submit();
			flushAll()
			$state.ensureAllTransitionsHappened()
		})
	})

})

	