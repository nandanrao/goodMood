angular.module('goodMood')
	.directive('voiceMessageAudio', function ($sce, Audio){
		return {
			restrict: 'E', 
			templateUrl: 'thread/voicemessage-audio.html',
			replace: true,
			controllerAs: 'voiceMessageAudio',
			controller: function ($scope, $attrs){
				$scope.audioURI;
				Audio.findById($scope.message.content).then(function(audio){
					$scope.audioURI = $sce.trustAsResourceUrl(audio.$value)
				})
			},
			link: function (scope, el, attrs){
				scope.media = el[0]
			}
		}
	})