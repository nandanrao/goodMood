angular.module('goodMood')
	.controller('MyCollaborationsCtrl', function ($scope, Auth, $state, user, collaborations, Collaboration){
		
		this.logout = function(){
		  Auth.logout();
		}
	
		$scope.user = user;

		$scope.collaborations = collaborations;

		this.newCollaboration = function(){
			$state.go('newCollaboration')
		}
	})