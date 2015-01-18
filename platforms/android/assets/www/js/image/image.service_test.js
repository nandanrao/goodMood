describe('Factory: Picture', function(){

	var fb,
			Picture,
			seed1,
			$rootScope,
			$firebase,
			$timeout,
			seedData,
			$q,
			testUtils,
			flushAll,
			image;

	var imageResize = {
		resize: null
	}

	beforeEach(function(){		

		module('goodMood', function($provide){
			$provide.value('imageResize', imageResize)
		});
		module('fbMock');
		module('authMock');
		module('testUtils');
	})

	beforeEach(inject(function (_fb_, _$firebase_, _$rootScope_, _$timeout_, _Picture_, _$q_, _testUtils_){
		testUtils = _testUtils_;
		flushAll = testUtils.flushAll;
		seedData = testUtils.seedDataURI;
		$timeout = _$timeout_;
		$rootScope = _$rootScope_;		
		fb = _fb_;
		$q = _$q_;
		$firebase = _$firebase_;
		Picture = _Picture_;


		imageResize.resize =  sinon.stub().returns($q.when('uri'))
	}))

	describe(' :: Instance Methods', function(){
	var picture;

		beforeEach(function(){
			Picture.create().then(function(_picture){
				picture = _picture
			})
			flushAll()
		})

		describe('$addImage', function(){

			it('throws an error when not given a string', function(){
				picture.$addImage.should.Throw()
			})

			it('returns a promise that resolves to itself', function(done){
				picture.$addImage(seedData).then(function(_picture){
					_picture.$id.should.equal(picture.$id)
					done()
				})
				// rediculous amount of flushing needed for all the image saves.
				flushAll()
				flushAll()
				flushAll()
				flushAll()
			})

			it('it synchronously adds a oroginal property', function(){
				picture.$addImage(seedData)
				picture.original.should.exist()
			})

			it('it synchronously adds the height and width of the image to itsself', function(){
				picture.$addImage(seedData)
				picture.width.should.be.a('number')
				picture.height.should.be.a('number')
			})

			it('uploads the data its given', function(done){
				picture.$addImage('test')
				fb.imageData.child(picture.original).on('value', function(snap){
					snap.val().should.equal('test')
					done()
				})
				flushAll()
			})
		})
	})

	describe(' :: Static Methods', function(){

		describe('calculateDimensions', function(){
			it('returns the correct size of the image in an object literal', function(){
				var dimensions = {
					width: 1200,
					height: 1600,
				}
				var ans = Picture.calculateDimensions(seedData)
				ans.should.be.instanceof(Object)
				ans.width.should.equal(dimensions.width)
				ans.height.should.equal(dimensions.height)
			})
		})

		describe('saveImageData', function (){
			it('resolves to the key of the newly uploaded data', function (done){
				Picture.saveImageData(seedData).then(function(key){
					key.should.be.a('string')
					done()
				})
				flushAll()
			})
		})

		describe('createThumbnail', function(){
			it('returns an the id to the thumbnail', function (done){
				Picture.createThumbnail(seedData).then(function(id){
					id.should.contain('mock')
					done()
				})
				flushAll()
				flushAll()	
			})
		})
	})

});