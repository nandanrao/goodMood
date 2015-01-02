angular.module('authMock', [])
	.factory('Auth', function(){
		var Auth = {};

		Auth.$getAuth = sinon.spy()

		Auth.currentUser = undefined;

		Auth.$onAuth = sinon.stub()
		
		return Auth
	})