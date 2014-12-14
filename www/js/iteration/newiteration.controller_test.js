describe('Controller: newIteration', function(){

		var newIteration,
		    Auth,
		    $q,
		    $window,
		    $log,
		    $state,
		    $scope,
		    collaboration,
		    Iteration,
		    iteration,
		    Image,
		    fb,
		    $cordovaCamera

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
		  	$id: 'id'
		  };

		  collaboration = {
		  	$id: 'id',
		  	$addIteration: sinon.stub().returns($q.when(iteration))
		  };

		  Iteration = {
		  	create: sinon.stub().returns($q.when(iteration))
		  }

		  user = {
		    $addCollaboration: sinon.stub().returns($q.when(collaboration))
		  }

		  $cordovaCamera = {
		  	getPicture: sinon.stub().returns($q.when())
		  }

		  Image = {
		  	create: sinon.stub().returns($q.when({
		  		$id: 'id'
		  	}))
		  }

		  newIteration = $controller('NewIterationCtrl', {
		    $window: $window,
		    $log: $log,
		    $scope: $scope,
		    user: user, 
		    collaboration: collaboration,
		    Iteration: Iteration,
		    $cordovaCamera: $cordovaCamera,
		    Image: Image,
		  })

		}))

		describe('takePicture', function(){

			beforeEach(function(){
				$state.expectTransitionTo('^.iteration')
			})

			it('takes a picture', function(){
				newIteration.takePicture()
				flushAll()
				$cordovaCamera.getPicture.should.have.been.called
			})

			it('creates a new image object and saves it to the db', function(){
				newIteration.takePicture()
				flushAll()
				Image.create.should.have.been.called
			})

			it('creates a new iteration object and save it to the db', function(){
				newIteration.takePicture()
				flushAll()
				Iteration.create.should.have.been.called
			})

			it('adds that iteration to the current collaboration', function(){
				newIteration.takePicture()
				flushAll()
				collaboration.$addIteration.should.have.been.called
			})
		})

})