angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, $ionicLoading, $ionicHistory, thread, messages, Auth, utils){
		$scope.threadInstance = thread;
		$scope.messages = messages;
		$scope.writing;
		$scope.recordNote;
		$scope.recordTime = {
			currently: false
		}

		$scope.recording = {
			currently: false
		}
		$scope.textField = {
			content: null
		};

		$scope.$on('$ionicView.enter', function(){
			thread.$open()
		})
		$scope.$on('$ionicView.leave', function(){
			thread.$close()
		})
		
		var vm = this;

		this.getTitle = function(){
			if (_.size(messages) > 0){
				return _.first(messages).content
			}
			else {
				return 'New Thread'
			}
		}

		this.getRecordTime = function(){
			if (!$scope.recordTime.currently){
				return '00:00'
			}
			return utils.parseTime($scope.recordTime.currently)
		}

		this.writing = function(){
			$scope.writing = true;
		}

		this.notWriting = function(){
			$scope.writing = false;
		}

		this.goBack = function(){
			$ionicHistory.goBack()
		}

 		// TODO: add blur() to input field directive to hide keyboard after send!
		this.sendMessage = function(type, content){
			$ionicLoading.show()
			return thread.$addMessage({
				content: content,
				user: Auth.currentUser.$id,
				type: type,
			}).then(function(message){
				$scope.writeMessage = false;
				$scope.textField = null;
				$ionicLoading.hide()
			})
			
		}

	})
