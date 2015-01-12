describe('Factory: User', function(){
	var User,
			authObj,
			fb,
			$timeout,
			$q,
			$firebase

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

	beforeEach(inject(function (_User_, _fb_, _$timeout_, _$q_, _Facebook_, _$firebase_){
		$firebase = _$firebase_;
		$q = _$q_;
		$timeout = _$timeout_;
		User = _User_;
		fb = _fb_;
		var collaboration = {
			$populate: sinon.stub().returns($q.when({
				collaboration: 'test',	
			}))
		}
		Facebook.getPicture = sinon.stub().returns($q.when());
		Collaboration.create = sinon.stub().returns($q.when(collaboration))
		Collaboration.findById = sinon.stub().returns($q.when(collaboration))

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
		var collaboration;

		beforeEach(function(done){
			var ref = fb.collaborations.push({$id: 'id'})
			collaboration = $firebase(ref).$asObject()

			User.create('facebook', authObj).then(function(obj){
				user = obj
				done()
			})

			flushAll()
			flushAll()
		})

		describe(':: $addCollaboration', function(){

			it('resolves to the collaboration object', function(){
				user.$addCollaboration(collaboration).then(function(obj){
					obj.should.equal(collaboration)
				})
				flushAll()
				flushAll()
			})

			it('adds the $id of the new collaboration to its collaborations property', function(){
				user.$addCollaboration(collaboration)
				flushAll()
				flushAll()
				user.collaborations.should.have.property(collaboration.$id)
			})
		})

		describe(':: $removeCollaboration', function(){
			var collaboration;

			beforeEach(function(done){
				Collaboration.create.returns($q.when({
					$id: 'id'
				}))
				user.$addCollaboration('name').then(function(obj){
					collaboration = obj
					done()
				})
				flushAll()
				flushAll()
			})

			it('removes the collaboration from the users collaborations property', function(){
				flushAll()
				_.size(user.collaborations).should.equal(1)
				user.$removeCollaboration(collaboration.$id)
				flushAll()
				_.size(user.collaborations).should.equal(0)
			})
		})

		describe(':: $getCollaborations', function(){

			beforeEach(function(){
				user.$addCollaboration(collaboration)
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