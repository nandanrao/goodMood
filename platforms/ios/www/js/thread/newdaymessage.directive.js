angular.module('goodMood')
	.directive('newDayMessage', function (utils){
		return {
			restrict: 'E',
			templateUrl: 'thread/newdaymessage.html',
			controllerAs: 'newDayMessage',
			controller: function (){
				this.getNewDayMessage = function(message){
					return utils.formatDate(message.sentAt, {
						month: 'long',
						weekday: 'long',  
						day: 'numeric',
						year: 'numeric', 
					})
				}
			}
		}
	})