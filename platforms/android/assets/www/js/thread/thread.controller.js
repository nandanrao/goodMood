angular.module('goodMood')
	.controller('ThreadCtrl', function ($scope, $ionicLoading, $ionicHistory, thread, messages, Auth, utils){
		$scope.messages = messages;
		$scope.writing = {
			currently: false
		}
		$scope.recordNote;
		$scope.recordTime = {
			currently: false
		}

		$scope.scopeName = 'thread'

		$scope.$on('ionic.disconnectScope', function(){
			console.log('scope disconnected', $scope)
		})

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

		this.isPreviousSender = function(msg, i) {
			if (i === 0){
				return false
			}
			return getFormerMsg(msg, i).user === msg.user
		}

		$scope.$watch(function(){
			console.count('thread digest run')
		})

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
			var scope = $scope;
			var parent = scope.$parent;
			scope.$$disconnected = true;
			scope.$broadcast('$ionic.disconnectScope');
			// See Scope.$destroy
			if (parent.$$childHead === scope) {
			  parent.$$childHead = scope.$$nextSibling;
			}
			if (parent.$$childTail === scope) {
			  parent.$$childTail = scope.$$prevSibling;
			}
			if (scope.$$prevSibling) {
			  scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
			}
			if (scope.$$nextSibling) {
			  scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;
			}
			scope.$$nextSibling = scope.$$prevSibling = null;
			console.log('disconnecting!')
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
