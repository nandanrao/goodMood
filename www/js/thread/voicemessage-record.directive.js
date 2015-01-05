angular.module('goodMood')
	.directive('voiceMessageRecord', function ($log, $window, $document, $ionicLoading, $cordovaMedia, $cordovaFile, Audio, utils){
		return {
			restrict: 'EA',
			templateUrl: 'thread/voicemessagerecord.html',
			controllerAs: 'record',
      replace: true,
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

    		function cordovaRecord(){
    			if (!$scope.recording){
    				console.log('mic clicked - start recording')	
    				var fileName = utils.uuid() + '.wav'
    				var src = fileTransferDir + fileName
    				var fileSrc = fileDir + fileName;
    				var dataURI;
    				var audio;
    				var messageSent;
    				var audioCreated = Audio.create(false)
    				
    				media = $cordovaMedia.newMedia(src)
    				media
    					.then(function(){
    						media.release()
    						messageSent = audioCreated.then(function(_audio){
    							audio = _audio
    							return $scope.thread.sendMessage('audio', audio.$id)
    						})
    						return $cordovaFile.readAsDataURL(fileSrc)
    					})
    					.then(function(_dataURI){
    						dataURI = _dataURI
    						audio.$inst().$set(dataURI).then(function(){
    							console.log('audio saved to server', Date.now())
    						})
    						return messageSent
    					})
    					.then(function(){
    						console.log('message sent', Date.now())
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
    		}

    		function desktopRecord(){
    			$window.alert('sorry, no recording on desktop yet!')
    		}

				this.record = function (){			
					if (utils.isDesktop()){
						desktopRecord()
					}
					else {
						cordovaRecord()
					}
				}
			},
			link: function (){

			}
		}
	})