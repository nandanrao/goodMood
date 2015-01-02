angular.module('goodMood')
	.directive('voiceMessageRecord', function ($cordovaMedia, $cordovaFile, Audio, Auth){
		return {
			restrict: 'EA',
			templateUrl: 'thread/voicemessagerecord.html',
			controllerAs: 'record',
			controller: function ($scope, $element){
				var vm = this

				$scope.recording = false;

				// add filesystemnormalization to create the filepath for this!!
				
				var media;


				
				
				$element.on('click', function (){
					console.log('mic clicked')
					
					if (!$scope.recording){
						var fileName = "sound2.wav"
						var src = cordova.file.externalDataDirectory + fileName
						media = $cordovaMedia.newMedia(src)

						console.log(cordova.file.externalDataDirectory)
						
						media.then(function(){
							console.log('media creation succes')
							var fileSrc = src.replace('file:///storage/sdcard0/', '')
							$cordovaFile.readAsDataURL(fileSrc)
								.then(function(dataURI){
									Audio.create(dataURI).then(function(audio){
										$scope.thread.sendMessage('audio', audio.$id)
									}, function(err){
										console.log('error creating audio instance', err)
									})
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