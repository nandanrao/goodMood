describe('Factory: utils', function(){
	var utils

	beforeEach(function(){
		module('goodMood')
	})

	beforeEach(inject(function (_utils_){
		utils = _utils_;
	}))

	describe('gatherMessageStreams', function(){

		it('combines multiple streams of messages into one', function(done){
			var stream1 = Bacon.sequentially(10, [
					['1', '2'],
					['1', '2', '3']
				])

			var msg1 = {msg: 'msg1'};
			var msg10 = {msg: 'msg10'};
			var msg2a = {msg: 'msg2a'};
			var msg2b = {msg: 'msg2b'};
			var msg3 = {msg: 'msg3'}

			var notificationFn = sinon.stub();

			notificationFn.withArgs('1')
				.onCall(0).returns(Bacon.interval(20, [msg1]))
				.onCall(1).returns(Bacon.interval(20, [msg10]))
			notificationFn.withArgs('2')
				.returns(Bacon.interval(20, [msg2a, msg2b]))	
			notificationFn.withArgs('3')
				.returns(Bacon.interval(20, [msg3]))
			
			var spy = sinon.spy()
			var stream = utils.gatherMessageStreams(stream1, notificationFn)
			stream.onValue(function(val){
				spy(val)
			})

			setTimeout(function(){
				spy.firstCall.calledWith([msg1, msg2a, msg2b]).should.be.true
				spy.secondCall.calledWith([msg10, msg2a, msg2b, msg3]).should.be.true
				done()
			}, 100)

		})
	})
})