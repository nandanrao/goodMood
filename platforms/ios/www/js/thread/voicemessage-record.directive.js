angular.module('goodMood')
	.directive('voiceMessageRecord', function ($log, $window, $ionicLoading, $cordovaMedia, $cordovaFile, Audio, Auth){
		return {
			restrict: 'EA',
			templateUrl: 'thread/voicemessagerecord.html',
			controllerAs: 'record',
			controller: function ($scope, $element){
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
					console.log('mic clicked')					
					if (!$scope.recording){
						var fileName = 'test.wav'
						var src = fileTransferDir + fileName
						var fileSrc = fileDir + fileName;
						
						console.log('src', src)
						console.log('filesrc', fileSrc)
						media = $cordovaMedia.newMedia(src)
						media
							.then(function(){
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

						media.startRecord()
						$scope.recording = true;	
					}
					else {
						media.stopRecord()
						media.release()
						$ionicLoading.show()
						$scope.recording = false;
					}
				})




			},
			link: function (){

			}
		}
	})