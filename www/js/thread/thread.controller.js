angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, $ionicLoading, $ionicHistory, thread, messages, Auth, utils){
		$scope.thread = thread;
		$scope.messages = messages;
		$scope.writeMessage;
		$scope.recordNote;
		$scope.text;

		$scope.$on('$ionicView.enter', function(){
			thread.$open()
		})
		$scope.$on('$ionicView.leave', function(){
			thread.$close()
		})
		
		var vm = this;

		this.formatDate = utils.formatDate;

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

		this.goBack = function(){
			$ionicHistory.goBack()
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
