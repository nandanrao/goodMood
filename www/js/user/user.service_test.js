describe('Factory: User', function(){
	var User,
			authObj,
			fb,
			$timeout,
			$q

	var Collaboration = {
		create: undefined,
		findById: undefined
	}

	var Facebook = {
		getPicture: undefined
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
			$provide.value('Facebook', Facebook)
			$provide.value('Collaboration', Collaboration)
		})
		module('fbMock');
		module('authMock');
	})

	beforeEach(inject(function (_User_, _fb_, _$timeout_, _$q_, _Facebook_){
		$q = _$q_;
		$timeout = _$timeout_;
		User = _User_;
		fb = _fb_;
		Facebook.getPicture = sinon.stub().returns($q.when());
		Collaboration.create = sinon.stub().returns($q.when({
			collaboration: 'test',
		}))
		Collaboration.findById = sinon.stub().returns($q.when({
			collaboration: 'test',
		}))

		authObj = {
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
	}))

	describe(':: Static Methods', function(){

		describe(':: create', function(){
			
			it('throws a type error when not given a proper authorization object', function(){
				User.create.bind(this, 'string', {}).should.Throw(TypeError)
			})
		})

		describe(':: findByAuth', function(){

			it('resolves without a value when user does not exist in db', function(done){
				User.findByAuth('facebook', authObj).then(function(results){
					should.not.exist(results)
					done()
				})
				flushAll()
			})
		})

	})

	describe(':: Instance Methods', function(){
		var user;

		beforeEach(function(done){
			User.create('facebook', authObj).then(function(obj){
				user = obj
				done()
			})
			flushAll()
			flushAll()
		})

		describe(':: addCollaboration', function(){

			it('creates a new Collaboration via the Collaboration.create method', function(){
				user.$addCollaboration()
				Collaboration.create.should.have.been.called
			})

			it('resolves to the collaboration object', function(){
				var test = {
					$id: 'id'
				}
				Collaboration.create.returns($q.when(test))
				user.$addCollaboration().then(function(obj){
					obj.should.include(test)
				})
				flushAll()
				flushAll()
			})

			it('adds the $id of the new collaboration to its collaborations property', function(){
				Collaboration.create.returns($q.when({
					$id: 'id'
				}))
				user.$addCollaboration()
				flushAll()
				flushAll()
				user.collaborations.should.have.property('id')
			})
		})

		describe(':: $getCollaborations', function(){
			var collaboration; 

			beforeEach(function(){
				user.$addCollaboration()
				flushAll()
				flushAll()
			})
			
			it('returns an object', function(){
				var collaborations = user.$getCollaborations()
				flushAll()
				should.exist(collaborations)
			})
		})
	})
	
})