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
				// TODO: don't load all of these immediately? 
				Audio.findById($scope.message.content).then(function(audio){
					$scope.audio = audio;
				})
				// TODO: we really need to not be watching the entire URI!
				// watch in order to use sce trust as resource... (whitelist??)
				$scope.$watchCollection('audio', function(audio){
					if (audio && audio.$value){
						$scope.audioHasValue = true;
						$scope.audioURI = $sce.trustAsResourceUrl(audio.$value)	
					}
					else {
						$scope.audioHasValue = false;
					}
				})
			},
			link: function (scope, el, attrs){
				scope.media = el[0];
				scope.currentTime = el[0].currentTime
				scope.mediaEl = el;
			}
		}
	})