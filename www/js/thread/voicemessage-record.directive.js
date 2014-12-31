angular.module('goodMood')
	.directive('voiceMessageRecord', function ($cordovaMedia, $cordovaFile){
		return {
			restrict: 'EA',
			templateUrl: 'thread/voicemessagerecord.html',
			controllerAs: 'record',
			controller: function ($scope, $element){
				var vm = this

				$scope.recording = false;

				// test for platform and create file based on that?
				
				var media;
				// TODO: error handling/checking for start/stop recording???
				$element.on('click', function (){
					console.log('mic clicked')
					
					if (!$scope.recording){
						var fileName = "sound2.amr"
						var src = cordova.file.externalDataDirectory + fileName
						media = $cordovaMedia.newMedia(src)

						console.log(cordova.file.externalDataDirectory)
						
						media.then(function(){
							console.log('media creation succes')
							var fileSrc = src.replace('file:///storage/sdcard0/', '')
							$cordovaFile.checkFile(fileSrc)
								.then(function(results){
									console.log('this tha results', _.keys(results), _.values(results))
								}, function(err){ 
									console.log('errrrraaa', err)
								})
							
						}, function(err){
							console.log('err', err)
						})

						media.startRecord()
						$scope.recording = true;	
					}
					else {
						media.stopRecord()
						media.release()
						$scope.recording = false;
					}
				})




			},
			link: function (){

			}
		}
	})