angular.module('goodMood')
	.directive('voiceMessage', function (utils, Auth, Audio){
		return {
			restrict: 'E',
			templateUrl: 'thread/voicemessage.html',
			controllerAs: 'voiceMessage',
			link: function (scope, el, attrs){
				scope.formatDate = utils.formatDate;
				scope.sender = false;
				scope.audioURI;
				Audio.findById(scope.message.content).then(function(audio){
					scope.audioURI = audio.$value
				})
				if (scope.message.user === Auth.currentUser.$id){
					scope.sender = true;
					scope.points = "22.1,43.3 0,21.7 22.1,0"
				}
				else {
					scope.points = "0,0 22.1,21.7 0,43.3"
				}
			}
		}
	})