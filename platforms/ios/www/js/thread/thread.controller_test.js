describe('Controller: NewCollaboration', function(){
	var $q,
	    $window,
	    $log,
	    $scope,
	    Auth,
	    Thread,
	    utils,
	    ThreadCtrl

	beforeEach(function(){
	  module('goodMood')
	  module('fbMock');
	  module('authMock');
	})

	beforeEach(inject(function ($controller, _$q_, _$rootScope_){
	  $rootScope = _$rootScope_;
	  $scope = $rootScope.$new();
	  $window = {
	    alert: sinon.spy()
	  }
	  $log = {
	    error: sinon.spy(),
	    debug: sinon.spy()
	  }

	  ThreadCtrl = $controller('NewCollaborationCtrl', {
	    // $window: $window,
	    // $log: $log,
	    $scope: $scope,
	  })

	}))

	describe('', function(){


	})

})