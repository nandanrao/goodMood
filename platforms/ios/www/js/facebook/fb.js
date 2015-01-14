angular.module('goodMood')	
	.factory('fb', function(){

		var fb = {};

		fb.ref = new Firebase('https://goodmood.firebaseio.com')

		fb.users = fb.ref.child('users');
		fb.threads = fb.ref.child('threads');
		fb.iterations = fb.ref.child('iterations');
		fb.collaborations = fb.ref.child('collaborations');
		fb.messages = fb.ref.child('messages');
		fb.images = fb.ref.child('images');
		fb.imageData = fb.ref.child('imageData');
		fb.audio = fb.ref.child('audio');
		
		return fb
	})