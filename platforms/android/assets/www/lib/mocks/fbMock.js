angular.module('fbMock', [])
	.factory('fb', function(){

		var fbMock = new MockFirebase('http://goodmoodtest.firebaseio.com', {
			users: {

			},
			threads: {

			},
			iterations: {

			},
			collaborations: {

			},
			messages: {

			},
			images: {

			}	
		})


		var fb = {};
		fb.users = fbMock.child('users');
		fb.threads = fbMock.child('threads');
		fb.iterations = fbMock.child('iterations');
		fb.collaborations = fbMock.child('collaborations');
		fb.messages = fbMock.child('messages');
		fb.images = fbMock.child('images');
		fb.ref = fbMock;

		return fb;

	})