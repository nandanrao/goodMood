angular.module('goodMood')
	.controller('MyCollaborationsCtrl', function ($scope, Auth, $state, user, collaborations, Collaboration){
		console.log('in my colab controller')		
		this.logout = function(){
		  Auth.logout();
		}
	
		$scope.user = user;

		$scope.collaborations = collaborations;

		this.newCollaboration = function(){
			$state.go('newCollaboration')
		}
	})