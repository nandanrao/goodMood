angular.module('goodMood')
	.directive('voiceMessage', function (utils, Auth, Audio){
		return {
			restrict: 'E',
			templateUrl: 'thread/voicemessage.html',
			controllerAs: 'voicemessage',
			controller: function ($scope){
				this.play = function(){
					console.log("play dawg this clicked")
					$scope.media.play()
					console.log($scope.media)
				}
			},
			link: function (scope, el, attrs){
				scope.formatDate = utils.formatDate;
				scope.sender = scope.message.user === Auth.currentUser.$id
			}
		}
	})