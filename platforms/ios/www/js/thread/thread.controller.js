angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, $ionicLoading, $ionicHistory, $stateParams, Auth, utils, Thread){
		var vm = this;
		var thread,
				messages,
				resolve;

		function init(){
			console.log('thread.findbyid called', Date.now())
			return Thread.findById($stateParams.t_id).then(function(_thread){
				console.log('findbyid returned', Date.now())
				thread = _thread;
				thread.$open();
				console.log('getMessages called', Date.now())
				return thread.$getMessages()
			})
			.then(function(_messages){
				console.log('getMessages returned', Date.now())
				messages = _messages;
				$scope.messages = messages;
				resolve = true;
				return
			})	
		}

		$scope.$on('$ionicView.enter', function(){
			if (!resolve){
				init().then(function(){
					$ionicLoading.hide()
				})
			}
		})
		
	  $scope.$on('$ionicView.beforeEnter', function(){
	  	if (resolve){
  			$ionicLoading.hide()
	  	}
	  })

	  $scope.$on('$ionicView.enter', function(){
	  	thread && thread.$open();
	  })

	  $scope.$on('$ionicView.leave', function(){
	  	thread.$close()
	  })

	  // $destroy needs a short delay after $close, because $close modifies thread
	  // and it would appear that firebase can't deal with the rapidity
	  $scope.$on('$ionicView.afterLeave', function(){
	  	thread.$destroy()
	  })

	  $scope.$watch(function(){
	  	// console.count('thread digest run')
	  })

		$scope.writing = {
			currently: false
		}
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

		this.isPreviousSender = function(msg, i) {
			if (i === 0){
				return false
			}
			return getFormerMsg(msg, i).user === msg.user
		}

		this.isNewDay = function(msg, i){
			if (i === 0) {
				return false
			}
			var prevDate = new Date(getFormerMsg(msg, i).sentAt);
			var newDate = new Date(msg.sentAt);
			var options = {day: 'numeric'}
			var ans = newDate.getDate() !== prevDate.getDate()
			return ans
		}

		function getFormerMsg(msg, i){
			if (i) {
				return messages[i-1] || 0
			}
		}

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
			$scope.writing.currently = true;
		}

		this.notWriting = function(){
			$scope.writing.currently = false;
		}

		this.goBack = function(){
			ionic.Utils.disconnectScope($scope)
			$ionicHistory.goBack()
		}

 		// TODO: add blur() to input field directive to hide keyboard after send!
		this.sendMessage = function(type, content){
			$ionicLoading.show()
			thread.$addMessage({
				content: content,
				user: Auth.currentUser.$id,
				type: type,
			}).then(function(message){
				$ionicLoading.hide()
			})
			$scope.writing.currently = false;
			$scope.textField.content = null;
		}
	})
