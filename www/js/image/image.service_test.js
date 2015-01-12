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
			imageResize: imageResize
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

			it.only('returns a promise that resolves to itself', function(done){
				picture.$addImage(seedData).then(function(_picture){
					_picture.$id.should.equal(picture.$id)
					done()
				})
				flushAll()
				flushAll()
				flushAll()
			})

			it('it adds the given image data to its local _original property', function(done){
				picture.$addImage(seedData).then(function(_picture){
					_picture._original.should.equal(seedData)
					done()
				})
				flushAll()
			})

			it('it adds the height and width of the image to itsself', function(done){
				picture.$addImage(seedData).then(function(_picture){
					_picture.width.should.be.a('number')
					_picture.height.should.be.a('number')
					should.not.exist(_picture._full)
					done()
				})
				flushAll()
			})

			it('uploads the data its given', function(){
				var spy = sinon.spy(Picture, 'saveImageData')
				picture.$addImage('test')
				flushAll()
				spy.should.have.been.calledWith('test')
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
			})
		})

		describe('createThumbnail', function(){

			it('returns an image', function (done){
				
				Picture.createThumbnail(seedData).then(function(a,b){
					console.log(a,b)
					done()
				})
				flushAll()

				flushAll()	
			})
		})
	})

});