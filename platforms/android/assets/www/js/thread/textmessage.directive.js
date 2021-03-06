angular.module('goodMood')
	.directive('textMessage', function (utils, Auth){
		return {
			restrict: 'E',
			templateUrl: 'thread/textmessage.html',
			controllerAs: 'textMessage',
			scope: true,
			link: function (scope, el, attrs){
				scope.formatDate = utils.formatDate;
				scope.sender = false;
				if (scope.message.user === Auth.currentUser.$id){
					scope.sender = true;
					scope.points = "22.1,43.3 0,21.7 22.1,0"
				}
				else {
					scope.points = "0,0 22.1,21.7 0,43.3"
				}
			}
		}
	})