describe('Controller: newIteration', function(){

		var newCollaboration,
		    Auth,
		    $q,
		    $window,
		    $log,
		    $state,
		    $scope,
		    collaboration,
		    iteration,
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
		  };

		  iteration = {
		  	$id: 'id'
		  };

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

		describe('', function(){

			it('', function(){
				
			})
		})

})