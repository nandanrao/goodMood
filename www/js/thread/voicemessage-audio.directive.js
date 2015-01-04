angular.module('goodMood')
	.directive('voiceMessageAudio', function ($sce, Audio){
		return {
			restrict: 'E', 
			templateUrl: 'thread/voicemessage-audio.html',
			replace: true,
			controllerAs: 'voiceMessageAudio',
			controller: function ($scope, $attrs){
				$scope.audioURI;
				$scope.audio;
				// TODO: get this into the resolve of the thread! Maybe messages class populated? 
				Audio.findById($scope.message.content).then(function(audio){
					$scope.audio = audio;
				})
				// watch in order to use sce trust as resource... (whitelist??)
				$scope.$watchCollection('audio', function(audio){
					if (audio && audio.$value){
						console.log('audio has value')
						$scope.audioURI = $sce.trustAsResourceUrl(audio.$value)	
					}
					else {
						console.log('audio has no value!')
					}
				})
			},
			link: function (scope, el, attrs){
				scope.media = el[0]
			}
		}
	})