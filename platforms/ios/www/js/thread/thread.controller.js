angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, $ionicLoading, $ionicHistory, $stateParams, Auth, utils, Thread){
		var vm = this;
		var thread,
				messages,
				threadResolve;

		function init(){
			threadResolve = Thread.findById($stateParams.t_id).then(function(_thread){
				thread = _thread;
				thread.$open();
				return thread.$getMessages()
			})
			.then(function(_messages){
				messages = _messages;
				$scope.messages = messages;
			})	
		}

		$scope.$on('$ionicView.enter', function(){
			if (!threadResolve){
				init()	
				threadResolve.then(function(){
					$ionicLoading.hide()
				})
			}
		})
		
	  $scope.$on('$ionicView.beforeEnter', function(){
	  	if (threadResolve){
	  		threadResolve.then(function(){
	  			$ionicLoading.hide()
	  		})	
	  	}
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

		$scope.$on('$ionicView.enter', function(){
			thread && thread.$open();
		})
		$scope.$on('$ionicView.leave', function(){
			thread.$close()
		})

		$scope.$watch(function(){
			console.count('thread digest run')
		})
		// $destroy needs a short delay after $close, because $close modifies thread
		// and it would appear that firebase can't deal with the rapidity
		$scope.$on('$ionicView.afterLeave', function(){
			thread.$destroy()
		})

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
