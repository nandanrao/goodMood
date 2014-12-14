angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, $ionicLoading, thread, messages, Auth){
		$scope.thread = thread;
		$scope.messages = messages;
		$scope.writeMessage;
		$scope.recordNote;
		$scope.text;

		this.getTitle = function(){
			if (_.size(messages) > 0){
				return _.first(messages).content
			}
			else {
				return 'New Thread'
			}
		}
 
		this.sendMessage = function(type, content){
			$ionicLoading.show()
			thread.$addMessage({
				content: content,
				user: Auth.currentUser,
				type: type,
			}).then(function(message){
				$ionicLoading.hide()
			})
			$scope.text = null;
		}

	})
