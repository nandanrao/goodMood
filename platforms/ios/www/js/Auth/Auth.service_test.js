xdescribe('Factory: Auth', function(){
	var Auth,
			Facebook,
			$q,
			fb

	var authObj = {
		google: {
			email: 'google@mail.com',
			displayName: 'google',
			cachedUserProfile: {
				picture: 'google'
			}
		},
		facebook: {
			email: 'fb@mail.com',
			displayName: 'facebook',
			cachedUserProfile: {
				picture: {
					data: {
						url: 'facebook'
					}
				}
			}
		}
	}

	var $firebaseAuth = sinon.stub().returns({
		$onAuth: sinon.stub()
	})

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
			$provide.value('Facebook', Facebook)
			$provide.value('$firebaseAuth', $firebaseAuth)

		});
		module('fbMock')
		module('stateMock')
	})

	beforeEach(inject(function (_Facebook_, _Auth_, _fb_, _$timeout_){
		$timeout = _$timeout_;
		fb = _fb_;
		Auth = _Auth_;
		Facebook = _Facebook_;
	}))

})
