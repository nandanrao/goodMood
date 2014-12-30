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
				var src = cordova.file.applicationDirectory + "media/sound.amr"
				console.log(_.keys($cordovaMedia.newMedia(src)))

			
				var media = $cordovaMedia.newMedia(src).then(function(){
					console.log('media created succesfully')
				}, function(err){
					console.log('media creating erred', err)
				})
				
				

				// TODO: error handling/checking for start/stop recording???
				$element.on('click', function (){
					console.log('mic clicked')
					if (!$scope.recording){
						media.startRecord()
						$scope.recording = true;	
					}
					else {
						media.stopRecord()
						$scope.recording = false;
						console.log(window.LocalFileSystem.TEMPORARY)
						console.log(media)
						// find file and upload? LocalFileSystem.TEMPORARY
						// window.LocalFileSystem.TEMPORARY?
					}
				})




			},
			link: function (){

			}
		}
	})