angular.module('goodMood')
	.directive('voiceMessagePlay', function ($document){
		return {
			restrict: 'E', 
			templateUrl: 'thread/voicemessage-play.html',
			replace: true,
			controllerAs: 'voiceMessagePlay',
			controller: function ($scope, $attrs, $element){
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
					console.log('mousedown')
					var x = e.offsetX
					var timecode = getTimecode(x)
					if (timecode > 0){
						console.log('on line')
						$scope.media.currentTime = timecode
						$document.on('mousemove', mousemove);
						$document.on('mouseup', mouseup);
					}
				}

				function getTimecode(x){
					var lineOffset = 88/543.5
					var svgWidth = $element[0].width.baseVal.value
					var pixelOffset = lineOffset * svgWidth
					var audioPercentage = (x - pixelOffset)/(svgWidth - pixelOffset)
					var timecode = audioPercentage*$scope.media.duration
					return timecode
				}

				function mousemove(e) {
					var x = e.offsetX
					var timecode = getTimecode(x)
					if (timecode > 0){
						$scope.media.currentTime = timecode
					}
					else {
						$scope.media.currentTime = 0
					}
				}

				function mouseup(e) {
				  $document.off('mousemove', mousemove);
				  $document.off('mouseup', mouseup);
				}
			},
			link: function (scope, el, attrs){
				
			}
		}
	})