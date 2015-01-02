angular.module('goodMood')
	.controller('SideMenuCtrl', function ($scope, Auth){
		// $scope.user = user;

		this.logout = function(){
		  Auth.logout();
		} 
	})