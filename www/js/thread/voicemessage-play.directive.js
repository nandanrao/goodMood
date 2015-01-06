angular.module('goodMood')
	.directive('voiceMessagePlay', function ($document, $interval, $window){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'thread/voicemessage-play.html',
			controllerAs: 'voiceMessagePlay',
			controller: function ($scope, $attrs, $element){
				var vm = this;
				var counter;

				$scope.playing = false;
				
				this.play = function(){
					if (!$scope.playing) {
						$scope.media.play()
						$scope.playing = true;
						animate()
						counter = $interval(angular.noop, 1000)
					}
					else {
						$scope.media.pause()
						$interval.cancel(counter)
						$scope.playing = false;
					}
					$scope.media.addEventListener('ended', function(e){
						$scope.playing = false;
						$interval.cancel(counter)
					})
				}

				function animate(){
					function draw(){
						$scope.playLine.setAttribute('x2', vm.getPlayerPosition())
						if ($scope.playing){
							$window.requestAnimationFrame(draw)
						}
					}
					$window.requestAnimationFrame(draw)	
				}

				this.getTime = function(){
					return parseTime($scope.media.currentTime)
				}

				function parseTime(time){
					var sec_num = parseInt(time, 10); 
					var hours   = Math.floor(sec_num / 3600);
					var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
					var seconds = sec_num - (hours * 3600) - (minutes * 60);
					if (minutes < 10) {minutes = "0"+minutes;}
					if (seconds < 10) {seconds = "0"+seconds;}
					var time    = minutes+':'+seconds;
					return time;
				}

				var lineStart = 47;
				var lineEnd = 472;
				var viewBox = 538.8;

				this.getPlayerPosition = function(){
					if (!$scope.media || !$scope.media.duration) {
						return lineStart
					}
					var media = $scope.media;
					var complete = media.currentTime/media.duration;
					var lineWidth = lineEnd - lineStart;
					var playedWidth = lineWidth*complete + lineStart
					return playedWidth
				}

				this.lineClick = function(e){
					var x = e.offsetX
					var timecode = getTimecode(x)
					if (timecode > 0 && timecode < $scope.media.duration){
						$scope.media.currentTime = timecode
						// $document.on('mousemove', mousemove);
						// $document.on('mouseup', mouseup);
					}
				}

				function getTimecode(x){
					var lineOffset = lineStart/viewBox
					var svgWidth = $element[0].width.baseVal.value
					var pixelOffset = lineOffset * svgWidth
					var pixelWidth = (lineEnd - lineStart)/viewBox * svgWidth
					var audioPercentage = (x - pixelOffset)/pixelWidth
					var timecode = audioPercentage*$scope.media.duration
					return timecode
				}
			}
		}
	})