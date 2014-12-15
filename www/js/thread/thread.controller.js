angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, $ionicLoading, thread, messages, Auth){
		$scope.thread = thread;
		$scope.messages = messages;
		$scope.writeMessage;
		$scope.recordNote;
		$scope.text;

		var vm = this;

		this.getTitle = function(){
			if (_.size(messages) > 0){
				return _.first(messages).content
			}
			else {
				return 'New Thread'
			}
		}

		this.recordNote = function(){
			$scope.recordNote = true;
			// cordovarecordmedia here
			// google cloud upload? 
			vm.sendMessage('voice', dataURI)
		}

		this.writeText = function(){
			$scope.writeMessage = true;
		}
 
		this.sendMessage = function(type, content){
			$ionicLoading.show()
			thread.$addMessage({
				content: $scope.text,
				user: Auth.currentUser,
				type: type,
			}).then(function(message){
				$ionicLoading.hide()
			})
			$scope.text = null;
		}

	})
