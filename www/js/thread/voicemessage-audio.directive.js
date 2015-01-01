angular.module('goodMood')
	.directive('voiceMessageAudio', function (Audio){
		return {
			restrict: 'E', 
			template: '<audio src="{{ audioURI }}" autoplay="true" loop="true"></audio>',
			controllerAs: 'voiceMessageAudio',
			link: function (scope, el, attrs){
				var audioId = attrs[audio-id] 
				console.log('audioId', audioId)
				scope.audioURI;
				Audio.findById(audioId).then(function(audio){
					scope.audioURI = audio.$value
					console.log('audio value', audio.$value)
				})
			}
		}
	})