angular.module('goodMood')
	.directive('textMessage', function (utils, Auth){
		return {
			restrict: 'E',
			templateUrl: 'thread/textmessage.html',
			controllerAs: 'textMessage',
			link: function (scope, el, attrs){
				scope.formatDate = utils.formatDate;
				scope.sender = scope.message.user === Auth.currentUser.$id
			}
		}
	})