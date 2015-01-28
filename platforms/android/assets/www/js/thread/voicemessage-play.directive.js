angular.module('goodMood')
	.directive('voiceMessagePlay', function ($document, $interval, $window, utils){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'thread/voicemessage-play.html',
			controllerAs: 'voiceMessagePlay',
			controller: function ($scope, $attrs, $element){
				var vm = this;
				var counter;

				$scope.playing = false;

				$scope.media.addEventListener('loadstart', function(){
					console.log('audio loading started')
				})

				$scope.media.addEventListener('canplay', function(){
					console.log('audio canplay')
				})

				$scope.media.addEventListener('canplaythrough', function(){
					console.log('audio canplaythrough')
				})
				
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
						return;
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
					return utils.parseTime($scope.media.currentTime)
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