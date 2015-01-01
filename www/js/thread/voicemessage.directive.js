angular.module('goodMood')
	.directive('voiceMessage', function (utils, Auth, Audio, $document){
		return {
			restrict: 'E',
			templateUrl: 'thread/voicemessage.html',
			controllerAs: 'voiceMessage',
			controller: function ($scope){
				$scope.playing = false;
				this.play = function(){
					if (!$scope.playing) {
						console.log('playing')
						$scope.media.play()
					}
					else {
						$scope.media.pause()
						console.log('pausing')
					}
					$scope.playing = !$scope.playing
				}

				this.mousedown = function(e){
					console.log(e)
					var x = e.offsetX
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				}

				function mousemove(event) {
					  
				}

				function mouseup() {
				  $document.off('mousemove', mousemove);
				  $document.off('mouseup', mouseup);
				}

			},
			link: function (scope, el, attrs){
				scope.formatDate = utils.formatDate;
				scope.sender = false;
				if (scope.message.user === Auth.currentUser.$id){
					scope.sender = true;
					scope.points = "22.1,43.3 0,21.7 22.1,0"
				}
				else {
					scope.points = "0,0 22.1,21.7 0,43.3"
				}

				el.on('mousedown', function(event) {
				    startX = event.pageX - x;
				    startY = event.pageY - y;
				    
				  });

				  
			}
		}
	})