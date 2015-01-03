angular.module('goodMood')
	.directive('voiceMessageRecord', function ($log, $window, $document, $ionicLoading, $cordovaMedia, $cordovaFile, Audio, utils){
		return {
			restrict: 'EA',
			templateUrl: 'thread/voicemessagerecord.html',
			controllerAs: 'record',
			controller: function ($scope, $element){
				console.log('this controller is running')
				var vm = this;				
				var media, fileTransferDir, fileDir;
				$scope.recording = false;

				if (ionic.Platform.isAndroid()) {
    			fileTransferDir = cordova.file.externalDataDirectory
					fileDir = /Android.*/.exec(fileTransferDir)[0]
	    	}
    		if (ionic.Platform.isIOS()) {
    			fileTransferDir = cordova.file.documentsDirectory.replace('file://', '') + '/NoCloud/';
    			fileDir = 'NoCloud/';
    		}

				$element.on('click', function (){			
					if (!$scope.recording){
						console.log('mic clicked - start recording')	
						var fileName = utils.uuid() + '.wav'
						var src = fileTransferDir + fileName
						var fileSrc = fileDir + fileName;
						
						console.log('src', src)
						console.log('filesrc', fileSrc)
						media = $cordovaMedia.newMedia(src)
						media
							.then(function(){
								media.release()
								return $cordovaFile.readAsDataURL(fileSrc)
							})
							.then(Audio.create)
							.then(function(audio){
								return $scope.thread.sendMessage('audio', audio.$id)
							})
							.then(function(){
								$ionicLoading.hide()
							})
							.catch(function(err){
								$log.error('error recording audio', err)
								$window.alert('sorry but we couldnt record your audio, try again?')
								$ionicLoading.hide()
							})

						$scope.recording = true;
						media.startRecord()	
					}
					else {	
						console.log('mic clicked - stop recording')
						$scope.recording = false;
						$ionicLoading.show()
						media.stopRecord()
					}
				})




			},
			link: function (){

			}
		}
	})