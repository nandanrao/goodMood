angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, thread, messages, Auth){
		$scope.thread = thread;
		$scope.messages = messages;

		$scope.text;

		this.sendMessage = function(){
			thread.$addMessage({
				content: $scope.text,
				user: Auth.currentUser
			}).then(function(message){
				console.log('message sent')
			})
			$scope.text = null;
		}

	})
